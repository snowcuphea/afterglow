package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.backend.afterglow.domain.ImageRecord;
import ssafy.backend.afterglow.repository.ImageRepository;
import ssafy.backend.afterglow.service.RecordService;

import org.springframework.web.multipart.MultipartFile;
import ssafy.backend.afterglow.domain.ImageRecord;
import ssafy.backend.afterglow.repository.ImageRepository;
import ssafy.backend.afterglow.repository.RecordRepository;
import ssafy.backend.afterglow.repository.UserRepository;
import ssafy.backend.afterglow.service.RecordService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import ssafy.backend.afterglow.domain.Record;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.service.RecordService;

import java.util.Map;
import java.util.Optional;

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

    // 여행 index 받으면 -> 여행 정보 return
    @GetMapping
    public ResponseEntity<Object> getRecord(@RequestParam("record_id") Long recId) {
        Optional<Record> result = service.selectRec(recId);
        if (result.isPresent())
            return new ResponseEntity<Object>(result, HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.NOT_ACCEPTABLE);
    }


    // 하루 기준 현 시간까지의 실시간 정보 받아오기
    @GetMapping("/current")
    public ResponseEntity<String> getCurrentInfo(@RequestParam("")) {
        Long dayRecId = Long.valueOf((Integer) data.get("day_record_id"));

//        if(service.selectRec(recId).isPresent())
//            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//        else
//            return new ResponseEntity<String>("FAIL", HttpStatus.NOT_ACCEPTABLE);
        return null;
    }

    // 유저 전체 여행
    @GetMapping("/")
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


}
