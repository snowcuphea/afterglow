package ssafy.backend.afterglow.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssafy.backend.afterglow.domain.ImageRecord;
import ssafy.backend.afterglow.domain.PinRecord;
import ssafy.backend.afterglow.dto.RecordDTO;
import ssafy.backend.afterglow.repository.ImageRepository;
import ssafy.backend.afterglow.repository.RecordRepository;
import ssafy.backend.afterglow.service.RecordService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("records")
@RequiredArgsConstructor
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    @Autowired
    RecordService service;

    private final ImageRepository imagerepository;
    private final RecordRepository recRepo;

//    @GetMapping
//    public ResponseEntity<String> sampleFunction() {
//        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//    }

    // 여행 시작
    @PostMapping("/start")
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
                    service.findNearestRr(drId, longitude, latitude)
                            .ifPresent(rr -> {
                                ir.setRr(rr);
                                imagerepository.save(ir);
                            });
                });
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
    }

    // 여행 선택 시 여행 정보 받아오기
    @GetMapping
    public ResponseEntity<Object> getRecord(@RequestParam("record_id") Long recId) {
        RecordDTO test = service.selectRecordInfo(recId);
        if (test != null)
            return new ResponseEntity<Object>(test, HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.NOT_ACCEPTABLE);
    }


    // 가계부 등록
    @PostMapping("/consumption")
    public ResponseEntity<Object> setConsumption(@RequestParam("consumption_name") String conName,
                                                 @RequestParam("consumption_money") Integer conMoney,
                                                 @RequestParam("consumption_time") LocalDateTime conTime) {

        return null;
    }

    // 가계부 수정
    @PutMapping("/consumption")
    public ResponseEntity<Object> modifyConsumption(@RequestParam("consumption_id") Long conId,
                                                    @RequestParam("consumption_name") String conName,
                                                    @RequestParam("consumption_money") Integer conMoney,
                                                    @RequestParam("consumption_time") LocalDateTime conTime) {

        return null;
    }

    // 메모(핀) 등록
    @PostMapping("/memo")
    public ResponseEntity<Object> setMemo(@RequestParam("route_id") Long rrId,
                                          @RequestParam("pin_name") String pinName,
                                          @RequestParam("pin_memo") String pinMemo) {
        if(service.insertMemo(rrId, pinName, pinMemo).isPresent())
            return new ResponseEntity<Object>("SUCCESS", HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.OK);
    }

    // 메모 수정
    @PutMapping("/memo")
    public ResponseEntity<Object> modifyMemo(@RequestParam("pin_id") Long pinId,
                                             @RequestParam("pin_memo") String pinMemo) {
        if(service.modifyMemo(pinId, pinMemo).isPresent())
            return new ResponseEntity<Object>("SUCCESS", HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.OK);
    }
}
