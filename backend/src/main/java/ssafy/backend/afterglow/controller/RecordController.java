package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.dto.ImageInputDto;
import ssafy.backend.afterglow.dto.RecordDTO;
import ssafy.backend.afterglow.repository.*;
import ssafy.backend.afterglow.service.RecordService;
import ssafy.backend.afterglow.service.UserService;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("records")
@RequiredArgsConstructor
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    private final RecordService recordService;
    private final UserService userService;

    private final ImageRepository imageRepository;
    private final RecordRepository recordRepository;
    private final DailyRepository dailyRepository;
    private final RouteRepository routeRepository;
    private final ConsumptionRepository conRepository;


    // 이미지 저장
    @SneakyThrows
    @PostMapping(value = "/saveImg")
    public ResponseEntity<Integer> setUserProfileImg(@RequestParam("img") List<ImageInputDto> images,
                                                     @AuthenticationPrincipal Principal principal) {
        Optional<User> user = userService.findUserByPrincipal(principal);
        Optional<DailyRecord> dr = dailyRepository.findByDrDateAndRec_User(LocalDate.now(), user.get());
        images
                .stream()
                .forEach(image -> {
                    ImageRecord ir = new ImageRecord();
                    try {
                        ir.setIrImage(image.getIrImage().getBytes());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    recordService.findNearestRr(dr.get().getDrId(), image.getLongitude(), image.getLatitude())
                            .ifPresent(rr -> {
                                ir.setRr(rr);
                                imageRepository.save(ir);
                            });
                });
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
    }

    // 여행 선택 시 여행 정보 받아오기
    @GetMapping
    public ResponseEntity<Object> getRecord(@RequestParam("record_id") Long recId) {
        RecordDTO test = recordService.selectRecordInfo(recId);
        if (test != null)
            return new ResponseEntity<Object>(test, HttpStatus.OK);
        else
            return new ResponseEntity<Object>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }


    // 여행 시작
    @PostMapping("/startTrip")
    public ResponseEntity<String> startTrip(@AuthenticationPrincipal Principal principal,
                                            @RequestParam("title") String recTitle) {
        AtomicReference<Record> record = null;
        AtomicReference<DailyRecord> dr = null;

        userService
                .findUserByPrincipal(principal)
                .ifPresent(user -> {
                    record.set(recordRepository.save(Record.builder()
                            .user(user)
                            .recName(recTitle)
                            .build()));
                    dr.set(dailyRepository.save(DailyRecord.builder()
                            .rec(record.get())
                            .drStartTime(LocalDateTime.now())
                            .build()));
                });
        return ResponseEntity.ok(principal.getName());
    }


    // 가계부 등록
    @PostMapping("/consumption")
    public ResponseEntity<Object> setConsumption(@RequestParam("day_id") Long dayId,
                                                 @RequestParam("consumption_name") String conName,
                                                 @RequestParam("consumption_money") Integer conMoney,
                                                 @RequestParam("consumption_time") LocalDateTime conTime) {
        AtomicReference<ConsumptionRecord> result = null;
        dailyRepository
                .findById(dayId)
                .ifPresent(dr -> {
                    result.set(conRepository.save(ConsumptionRecord.builder()
                            .dr(dr)
                            .crName(conName)
                            .crMoney(conMoney)
                            .crDatetime(conTime)
                            .build()));
                });
        return ResponseEntity.ok(result.get());
    }


    // 가계부 수정
    @PutMapping("/consumption")
    public ResponseEntity<Object> modifyConsumption(@RequestParam("consumption_id") Long conId,
                                                    @RequestParam("consumption_name") String conName,
                                                    @RequestParam("consumption_money") Integer conMoney,
                                                    @RequestParam("consumption_time") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime conTime) {
        AtomicReference<ConsumptionRecord> result = null;
        conRepository
                .findById(conId)
                .ifPresent(cr -> {
                    result.set(conRepository.save(ConsumptionRecord.builder()
                            .crName(conName)
                            .crMoney(conMoney)
                            .crDatetime(conTime)
                            .build()));
                });
        return ResponseEntity.ok(result.get());
    }

    // 가계부 삭제
    @DeleteMapping("/consumption")
    public ResponseEntity<Object> deleteConsumption(@RequestParam("consumption_id") Long conId){
        AtomicReference<ConsumptionRecord> result = null;
        conRepository
                .findById(conId)
                .ifPresent(cr -> {
                    conRepository.delete(cr);
                });
        return ResponseEntity.ok("DELETE CONSUMPTION");
    }


    // 유저 전체 여행
    @GetMapping("/total")
    public ResponseEntity<Object> currentUserToken(@AuthenticationPrincipal Principal principal) {
        AtomicReference<List<Record>> result = null;
        userService
                .findUserByPrincipal(principal)
                .ifPresent(user -> {
                    result.set(recordRepository.findByUser(user));
                });
        return ResponseEntity.ok(result);
    }

    // 하루 기준 현 시간까지의 실시간 정보 받아오기
    @GetMapping("/current")
    public ResponseEntity<Object> currentInfo(@AuthenticationPrincipal Principal principal,
                                              @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate today) {
        AtomicReference<DailyRecord> result = null;
        userService
                .findUserByPrincipal(principal)
                .ifPresent(user -> {
                    dailyRepository.findByDrDateAndRec_User(today, user)
                            .ifPresent(dr -> {
                                result.set(dr);
                            });
                });
        return ResponseEntity.ok(result);
    }


    // 하루끝
    @GetMapping("/dayEnd")
    public ResponseEntity<String> dayEnd(@AuthenticationPrincipal Principal principal) {
        userService
                .findUserByPrincipal(principal)
                .ifPresent(user -> {
                    dailyRepository.findByDrDateAndRec_User(LocalDate.now(), user)
                            .ifPresent(dr -> {
                                dr.setDrEndTime(LocalDateTime.now());
                            });
                });
        return ResponseEntity.ok("ok");
    }

    // 여행 중 위치 저장
    @PostMapping("/route")
    public ResponseEntity<Object> saveRoute(@RequestParam("dr_id") Long drId,
                                             @RequestParam("rr_latitude") Double rrLat,
                                             @RequestParam("rr_longitude") Double rrLong){
        AtomicReference<RouteRecord> result = null;
        dailyRepository.findById(drId)
                .ifPresent(dr -> {
                    result.set(routeRepository.save(RouteRecord.builder()
                            .dr(dr)
                            .rrLatitude(rrLat)
                            .rrLongitude(rrLong)
                            .build()));
                });
        return ResponseEntity.ok(result.get());
    }

    // 경로 이름 작성
    @PostMapping("/route/name")
    public ResponseEntity<RouteRecord> routeNaming(@RequestParam("route_name") String routeName,
                                                   @RequestParam("Rr_id") Long RrId) {
        AtomicReference<RouteRecord> result = null;
        routeRepository.findById(RrId)
                .ifPresent(rr -> {
                    rr.setRrName(routeName);
                    result.set(rr);
                });
        return ResponseEntity.ok(result.get());
    }


    // 메모 작성 and 수정
    @PostMapping("/memo/create")
    public ResponseEntity<RouteRecord> addAndUpdateMemo(@RequestParam("Rr_id") Long RrId,
                                                        @RequestParam("memo_content") String memoContent) {
        AtomicReference<RouteRecord> result = null;
        routeRepository
                .findById(RrId)
                .ifPresent(rr -> {
                    rr.setRrMemo(memoContent);
                    result.set(rr);
                });
        return ResponseEntity.ok(result.get());
    }

    // 하루 사진
    @GetMapping("/daily/picture")
    public ResponseEntity<List<ImageRecord>> dailyPicture(@AuthenticationPrincipal Principal principal) {
        List<ImageRecord> result = null;
        userService
                .findUserByPrincipal(principal)
                .ifPresent(user -> {
                    dailyRepository.findByDrDateAndRec_User(LocalDate.now(), user)
                            .ifPresent(dr -> {
                                routeRepository.findByDr(dr)
                                        .forEach(rr -> {
                                            result.addAll(imageRepository.findAllByRr(rr)
                                                    .orElse(new ArrayList<>()));
                                        });
                            });
                });
        return ResponseEntity.ok(result);
    }


    // 전체 사진
    @GetMapping("/trip/picture")
    public ResponseEntity<Map<LocalDate, List<ImageRecord>>> tripPicture(@RequestParam("rec_id") Long recId) {
        Map<LocalDate, List<ImageRecord>> result = null;
        recordRepository
                .findById(recId)
                .ifPresent(rec -> {
                    dailyRepository.findByRec(rec)
                            .forEach(dr -> {
                                routeRepository.findByDr(dr)
                                        .forEach(rr -> {
                                            if (result.containsKey(rr.getRrTime().toLocalDate())) {
                                                result.get(rr.getRrTime().toLocalDate()).addAll(imageRepository.findAllByRr(rr)
                                                        .orElse(new ArrayList<>()));
                                            } else {
                                                result.put(rr.getRrTime().toLocalDate(), imageRepository.findAllByRr(rr)
                                                        .orElse(new ArrayList<>()));
                                            }
                                        });
                            });
                });
        return ResponseEntity.ok(result);
    }


    // 여행 정보
    @GetMapping("/tripInfo")
    public ResponseEntity<Record> getRecord(@AuthenticationPrincipal Principal principal,
                                            @RequestParam("Record_id") Long recId) {
        var ref = new Object() {
            Record result;
        };
        recordRepository.findById(recId)
                .ifPresent(rec -> {
                    ref.result = rec;
                });
        return ResponseEntity.ok(ref.result);
    }
}
