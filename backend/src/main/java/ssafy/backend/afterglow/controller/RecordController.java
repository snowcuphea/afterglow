package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.repository.*;
import ssafy.backend.afterglow.service.RecordService;
import ssafy.backend.afterglow.dto.RecordDTO;
import ssafy.backend.afterglow.repository.ImageRepository;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.service.UserService;

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
    private final PinRepository pinRepository;


    // 이미지 저장
    @SneakyThrows
    @PostMapping(value = "/saveImg")
    public ResponseEntity<Integer> setUserProfileImg(@RequestParam("img") List<MultipartFile> files,
                                                     @RequestParam("drId") Long drId,
                                                     @RequestParam("longitude") Double longitude,
                                                     @RequestParam("latitude") Double latitude,
                                                     HttpServletRequest request) {
        files
                .stream()
                .forEach(file -> {
                    ImageRecord ir = new ImageRecord();
                    try {
                        ir.setIrImage(file.getBytes());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    recordService.findNearestRr(drId, longitude, latitude)
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
        if (recordService.insertConsumption(dayId, conName, conMoney, conTime).isPresent())
            return new ResponseEntity<Object>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
    }


    // 가계부 수정
    @PutMapping("/consumption")
    public ResponseEntity<Object> modifyConsumption(@RequestParam("consumption_id") Long conId,
                                                    @RequestParam("consumption_name") String conName,
                                                    @RequestParam("consumption_money") Integer conMoney,
                                                    @RequestParam("consumption_time") LocalDateTime conTime) {
        if (recordService.updateConsumption(conId, conName, conMoney, conTime).isPresent())
            return new ResponseEntity<Object>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
    }


    // 메모(핀) 등록
    @PostMapping("/memo")
    public ResponseEntity<Object> setMemo(@RequestParam("route_id") Long rrId,
                                          @RequestParam("pin_name") String pinName,
                                          @RequestParam("pin_memo") String pinMemo) {
        if (recordService.insertMemo(rrId, pinName, pinMemo).isPresent())
            return new ResponseEntity<Object>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
    }


    // 메모 수정
    @PutMapping("/memo")
    public ResponseEntity<Object> modifyMemo(@RequestParam("pin_id") Long pinId,
                                             @RequestParam("pin_memo") String pinMemo) {
        if (service.modifyMemo(pinId, pinMemo).isPresent())
            return new ResponseEntity<Object>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Object>(FAIL, HttpStatus.OK);
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
                    dailyRepository.findByDrDateAAndRec_User(today, user)
                            .ifPresent(dr -> {
                                result.set(dr);
                            });
                });
        return ResponseEntity.ok(result);
    }


    // 하루끝
    @GetMapping("/dayEnd")
    public ResponseEntity<String> dayEnd(@AuthenticationPrincipal Principal principal,
                                         @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate today) {
        userService
                .findUserByPrincipal(principal)
                .ifPresent(user -> {
                    dailyRepository.findByDrDateAAndRec_User(today, user)
                            .ifPresent(dr -> {
                                dr.setDrEndTime(LocalDateTime.now());
                            });
                });
        return ResponseEntity.ok("ok");
    }

    // 핀 이름 작성
    @PostMapping("/pin/create")
    public ResponseEntity<PinRecord> createPin(@RequestParam("pin_title") String pinTitle,
                                               @RequestParam("Rr_id") Long RrId) {
        AtomicReference<PinRecord> pr = null;
        routeRepository.findById(RrId)
                .ifPresent(rr -> {
                    pr.set(pinRepository.save(PinRecord.builder()
                            .prName(pinTitle)
                            .prMemo(null)
                            .rr(rr)
                            .build()));
                });
        return ResponseEntity.ok(pr.get());
    }


    // 메모 작성 and 수정
    @PostMapping("/memo/create")
    public ResponseEntity<PinRecord> addAndUpdateMemo(@RequestParam("Pr_id") Long PrId,
                                                      @RequestParam("memo_content") String memoContent) {
        AtomicReference<PinRecord> result = null;
        pinRepository
                .findById(PrId)
                .ifPresent(pr -> {
                    pr.setPrMemo(memoContent);
                    result.set(pr);
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
                    dailyRepository.findByDrDateAAndRec_User(LocalDate.now(), user)
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
        AtomicReference<Record> result = null;
        recordRepository.findById(recId)
                .ifPresent(rec -> {
                    result.set(rec);
                });
        return ResponseEntity.ok(result.get());
    }

    //
}
