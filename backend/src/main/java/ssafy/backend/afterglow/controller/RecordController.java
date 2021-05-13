package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.dto.ImageInputDto;
import ssafy.backend.afterglow.repository.*;
import ssafy.backend.afterglow.service.RecordService;
import ssafy.backend.afterglow.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("records")
@RequiredArgsConstructor
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    @Autowired
    private final RecordService recordService;
    @Autowired
    private final UserService userService;

    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final RecordRepository recordRepository;
    private final DailyRepository dailyRepository;
    private final RouteRepository routeRepository;
    private final ConsumptionRepository conRepository;


    // 이미지 저장
    @SneakyThrows
    @PostMapping(value = "/saveImg")
    public ResponseEntity<Integer> saveImg(@RequestParam("img") List<ImageInputDto> images,
                                           HttpServletRequest request,
                                           HttpServletResponse response) {
        Optional<User> user = userService.findUserByToken(request, response);
        Optional<DailyRecord> dr = dailyRepository.findByDrDateAndRec_User(LocalDate.now(), user.get());
        images
                .stream()
                .forEach(image -> {
                    ImageRecord ir = new ImageRecord();
                    try {
                        ir.setIrImage(image.getIrImage().getBytes());
                        ir.setImgHeight(image.getHeight());
                        ir.setImgWidth(image.getWidth());
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

    // 여행 시작
    @PostMapping("/startTrip")
    public ResponseEntity<Map<String, Object>> startTrip(@RequestParam("title") String recTitle,
                                                         HttpServletRequest request,
                                                         HttpServletResponse response) throws IOException {
        var ref = new Object() {
            Record record = null;
            DailyRecord dr = null;
        };

        Map<String, Object> result = new HashMap<>();
        userService
                .findUserByToken(request, response)
                .ifPresent(user -> {
                    ref.record = recordRepository.save(Record.builder()
                            .user(user)
                            .recName(recTitle)
                            .build());
                    ref.dr = dailyRepository.save(DailyRecord.builder()
                            .rec(ref.record)
                            .drStartTime(LocalDateTime.now())
                            .build());
                });
        result.put("recId", ref.record.getRecId());
        result.put("drId", ref.dr.getDrId());
        return ResponseEntity.ok(result);
    }

    // 하루 시작
    @PostMapping("/startDay")
    public ResponseEntity<Map<String, Object>> startDay(@RequestParam("recId") Long recId,
                                                        HttpServletRequest request,
                                                        HttpServletResponse response) throws IOException {
        var ref = new Object() {
            DailyRecord dr = null;
        };

        Map<String, Object> result = new HashMap<>();
        userService
                .findUserByToken(request, response)
                .ifPresent(user -> {
                    recordRepository.findById(recId)
                            .ifPresent(record -> {
                                ref.dr = dailyRepository.save(DailyRecord.builder()
                                        .drDate(LocalDate.now())
                                        .rec(record)
                                        .drStartTime(LocalDateTime.now())
                                        .build());
                            });
                });
        result.put("drId", ref.dr.getDrId());
        return ResponseEntity.ok(result);

    }


    // 가계부 등록
    @PostMapping("/consumption")
    public ResponseEntity<Object> setConsumption(@RequestParam("day_id") Long dayId,
                                                 @RequestParam("consumption_name") String conName,
                                                 @RequestParam("consumption_money") Integer conMoney,
                                                 @RequestParam("consumption_time") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime conTime) {
        var ref = new Object() {
            ConsumptionRecord result = null;
        };
        dailyRepository
                .findById(dayId)
                .ifPresent(dr -> {
                    ref.result = conRepository.save(ConsumptionRecord.builder()
                            .dr(dr)
                            .crName(conName)
                            .crMoney(conMoney)
                            .crDatetime(conTime)
                            .build());
                });
        return ResponseEntity.ok(ref.result);
    }


    // 가계부 수정
    @PutMapping("/consumption")
    public ResponseEntity<Object> modifyConsumption(@RequestParam("consumption_id") Long conId,
                                                    @RequestParam("consumption_name") String conName,
                                                    @RequestParam("consumption_money") Integer conMoney,
                                                    @RequestParam("consumption_time") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime conTime) {
        var ref = new Object() {
            ConsumptionRecord result = null;
        };
        conRepository
                .findById(conId)
                .ifPresent(cr -> {
                    ref.result = conRepository.save(ConsumptionRecord.builder()
                            .crName(conName)
                            .crMoney(conMoney)
                            .crDatetime(conTime)
                            .build());
                });
        return ResponseEntity.ok(ref.result);
    }

    // 가계부 삭제
    @DeleteMapping("/consumption")
    public ResponseEntity<Object> deleteConsumption(@RequestParam("consumption_id") Long conId) {
        conRepository
                .findById(conId)
                .ifPresent(cr -> {
                    conRepository.delete(cr);
                });
        return ResponseEntity.ok("DELETE CONSUMPTION");
    }


    // 유저 전체 여행
    @GetMapping("/total")
    public ResponseEntity<Object> totalTrip(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var ref = new Object() {
            List<Record> result = null;
        };
        userService
                .findUserByToken(request, response)
                .ifPresent(user -> {
                    ref.result = recordRepository.findByUser(user);
                });
        return ResponseEntity.ok(ref.result);
    }

    // 하루 기준 현 시간까지의 실시간 정보 받아오기
    @GetMapping("/current")
    public ResponseEntity<Object> currentInfo(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate today,
                                              HttpServletRequest request,
                                              HttpServletResponse response) throws IOException {
        var ref = new Object() {
            DailyRecord result = null;
        };
        userService
                .findUserByToken(request, response)
                .ifPresent(user -> {
                    dailyRepository.findByDrDateAndRec_User(today, user)
                            .ifPresent(dr -> {
                                ref.result = dr;
                            });
                });
        return ResponseEntity.ok(ref.result);
    }


    // 하루끝
    @GetMapping("/dayEnd")
    public ResponseEntity<String> dayEnd(HttpServletRequest request,
                                         HttpServletResponse response) throws IOException {
        userService
                .findUserByToken(request, response)
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
                                            @RequestParam("rr_longitude") Double rrLong) {
        var ref = new Object() {
            RouteRecord result = null;
        };
        dailyRepository.findById(drId)
                .ifPresent(dr -> {
                    ref.result = routeRepository.save(RouteRecord.builder()
                            .dr(dr)
                            .rrLatitude(rrLat)
                            .rrLongitude(rrLong)
                            .build());
                });
        return ResponseEntity.ok(ref.result);
    }

    // 경로 이름 작성
    @PostMapping("/route/name")
    public ResponseEntity<RouteRecord> routeNaming(@RequestParam("route_name") String routeName,
                                                   @RequestParam("Rr_id") Long RrId) {
        var ref = new Object() {
            RouteRecord result = null;
        };
        routeRepository.findById(RrId)
                .ifPresent(rr -> {
                    rr.setRrName(routeName);
                    ref.result = rr;
                });
        return ResponseEntity.ok(ref.result);
    }


    // 메모 작성 and 수정
    @PostMapping("/memo/create")
    public ResponseEntity<RouteRecord> addAndUpdateMemo(@RequestParam("Rr_id") Long RrId,
                                                        @RequestParam("memo_content") String memoContent) {
        var ref = new Object() {
            RouteRecord result = null;
        };
        routeRepository
                .findById(RrId)
                .ifPresent(rr -> {
                    rr.setRrMemo(memoContent);
                    ref.result = rr;
                });
        return ResponseEntity.ok(ref.result);
    }

    // 하루 사진
    @GetMapping("/daily/picture")
    public ResponseEntity<List<ImageRecord>> dailyPicture(HttpServletRequest request,
                                                          HttpServletResponse response) throws IOException {
        var ref = new Object() {
            List<ImageRecord> result = null;
        };
        userService
                .findUserByToken(request, response)
                .ifPresent(user -> {
                    dailyRepository.findByDrDateAndRec_User(LocalDate.now(), user)
                            .ifPresent(dr -> {
                                routeRepository.findByDr(dr)
                                        .forEach(rr -> {
                                            ref.result.addAll(imageRepository.findAllByRr(rr)
                                                    .orElse(new ArrayList<>()));
                                        });
                            });
                });
        return ResponseEntity.ok(ref.result);
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
    public ResponseEntity<Record> getRecord(@RequestParam("Record_id") Long recId,
                                            HttpServletRequest request,
                                            HttpServletResponse response) {
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
