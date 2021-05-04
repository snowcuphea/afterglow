package ssafy.backend.afterglow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.service.RecordService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("records")
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    @Autowired
    RecordService service;

    // 예시용
    @GetMapping("/test")
    public ResponseEntity<Object> sampleFunction(@RequestParam("user_id") Integer id){
        return new ResponseEntity<Object>(id, HttpStatus.OK);
    }

    // 여행 시작 클릭 -> 여행 정보 생성
    @PostMapping("/start")
    public ResponseEntity<String> startRecord(@RequestParam("user_id") Long userId, @RequestParam("rec_name") String recName){
        if(service.insertRec(userId, recName).isPresent())
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        else
            return new ResponseEntity<String>("FAIL", HttpStatus.NOT_ACCEPTABLE);
    }

    // 여행 index 받으면 -> 여행 정보 return
    @GetMapping
    public ResponseEntity<Object> getRecord(@RequestParam("record_id") Long recId){
        Optional<Record> result = service.selectRec(recId);
        if(result.isPresent())
            return new ResponseEntity<Object>(result, HttpStatus.OK);
        else
            return new ResponseEntity<Object>("FAIL", HttpStatus.NOT_ACCEPTABLE);
    }

    // 하루 기준 현 시간까지의 실시간 정보 받아오기
    @GetMapping("/current")
    public ResponseEntity<String> getCurrentInfo(@RequestParam("")){
        Long dayRecId = Long.valueOf((Integer)data.get("day_record_id"));

//        if(service.selectRec(recId).isPresent())
//            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//        else
//            return new ResponseEntity<String>("FAIL", HttpStatus.NOT_ACCEPTABLE);
        return null;
    }
}
