package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.repository.*;
import ssafy.backend.afterglow.service.RecordService;

import ssafy.backend.afterglow.domain.ImageRecord;
import ssafy.backend.afterglow.repository.ImageRepository;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

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

    private final ImageRepository imagerepository;
    private final RecordRepository recordRepository;
    private final DailyRepository dailyRepository;
    private final RouteRepository routeRepository;
    private final PinRepository pinRepository;

    @GetMapping
    public ResponseEntity<String> sampleFunction() {
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }


    public ResponseEntity<String> startRecord(@RequestParam("user_id") Long userId, @RequestParam("rec_name") String recName) {
        if (recordService.insertRec(userId, recName).isPresent())
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        else
            return new ResponseEntity<String>("FAIL", HttpStatus.NOT_ACCEPTABLE);
    }


    // 이미지 저장
    @SneakyThrows
    @PostMapping(value = "/saveImg")
    public ResponseEntity<Integer> setUserProfileImg(@RequestParam("img") List<MultipartFile> files,
                                                     @RequestParam("drId") Integer drId,
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
                                imagerepository.save(ir);
                            });
                });
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
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


    // 여행 index 받으면 -> 여행 정보 return
    @GetMapping
    public ResponseEntity<Object> getRecord(@RequestParam("record_id") Long recId) {
        Optional<Record> result = recordService.selectRec(recId);
        if (result.isPresent())
            return new ResponseEntity<Object>(result, HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.NOT_ACCEPTABLE);
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
                    dailyRepository.findByDrDate(today)
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
                    dailyRepository.findByDrDate(today)
                            .ifPresent(dr -> {
                                dr.setDrEndTime(LocalDateTime.now());
                            });
                });
        return ResponseEntity.ok("ok");
    }

    // 핀 이름 작성
    @PostMapping("/pin/create")
    public ResponseEntity<PinRecord> createPin(@RequestParam("pin_title") String pinTitle,
                                               @RequestParam("Rr_id") Integer RrId) {
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


    // 메모 작성
    @PostMapping("/memo/create")
    public ResponseEntity<PinRecord> addMemo(@RequestParam("Pr_id") Long PrId,
                                             @RequestParam("memo_content") String memoContent){
        AtomicReference<PinRecord> result = null;
        pinRepository
                .findById(PrId)
                .ifPresent(pr -> {
                    pr.setPrMemo(memoContent);
                    result.set(pr);
                });
        return ResponseEntity.ok(result.get());
    }
}
