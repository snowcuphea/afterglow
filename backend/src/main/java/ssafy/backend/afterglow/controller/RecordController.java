package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
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
import java.util.HashMap;
import java.util.List;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import ssafy.backend.afterglow.domain.Record;

@RestController
@RequestMapping("records")
@RequiredArgsConstructor
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    @Autowired
    RecordService service;

    private final ImageRepository imagerepository;
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;
    private final DailyRepository dailyRepository;

    @GetMapping
    public ResponseEntity<String> sampleFunction() {
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }


    public ResponseEntity<String> startRecord(@RequestParam("user_id") Long userId, @RequestParam("rec_name") String recName) {
        if (service.insertRec(userId, recName).isPresent())
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
                    service.findNearestRr(drId, longitude, latitude)
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
        if (principal instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) principal;

            userRepository.findByUsername(principal.getName())
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
        }
        return ResponseEntity.ok(principal.getName());
    }


    // 여행 index 받으면 -> 여행 정보 return
    @GetMapping
    public ResponseEntity<Object> getRecord(@RequestParam("record_id") Long recId) {
        Optional<Record> result = service.selectRec(recId);
        if (result.isPresent())
            return new ResponseEntity<Object>(result, HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.NOT_ACCEPTABLE);
    }


    // 유저 전체 여행
    @GetMapping("/total")
    public ResponseEntity<Object> currentUserToken(@AuthenticationPrincipal Principal principal) {
        AtomicReference<List<Record>> result = null;
        if (principal instanceof OAuth2AuthenticationToken) {
            Map<String, Object> attributes = new HashMap<>();
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) principal;
            userRepository.findByUsername(principal.getName())
                    .ifPresent(user -> {
                        result.set(recordRepository.findByUser(user));
                    });
        }
        return ResponseEntity.ok(result);
    }

    // 하루 기준 현 시간까지의 실시간 정보 받아오기
    @GetMapping("/current")
    public ResponseEntity<Object> currentInfo(@AuthenticationPrincipal Principal principal,
                                              @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate today) {
        AtomicReference<DailyRecord> result = null;
        if (principal instanceof OAuth2AuthenticationToken) {
            Map<String, Object> attributes = new HashMap<>();
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) principal;
            userRepository
                    .findByUsername(principal.getName())
                    .ifPresent(user -> {
                        dailyRepository.findByDrDate(today)
                                .ifPresent(dr -> {
                                    result.set(dr);
                                });
                    });
        }
        return ResponseEntity.ok(result);
    }


    // 하루끝
    @GetMapping("/current")
    public ResponseEntity<Object> dayEnd(@AuthenticationPrincipal Principal principal,
                                         @RequestParam("date") LocalDate today) {
        AtomicReference<DailyRecord> result = null;
        if (principal instanceof OAuth2AuthenticationToken) {
            Map<String, Object> attributes = new HashMap<>();
            OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) principal;
            
            userRepository
                    .findByUsername(principal.getName())
                    .ifPresent(user -> {
                        dailyRepository.findByDrDate(today)
                                .ifPresent(dr -> {
                                    result.set(dr);
                                });
                    });
        }
        return ResponseEntity.ok(result);
    }


}
