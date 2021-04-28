package ssafy.backend.afterglow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssafy.backend.afterglow.VO.*;
import ssafy.backend.afterglow.service.RecordService;

@RestController
@RequestMapping("records")
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    @Autowired
    RecordService service;

    @GetMapping
    public ResponseEntity<String> sampleFunction(){
        return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Integer> makeRecord(@RequestBody RecVO rec){
        if(service.insertRec(rec))
            return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Integer>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping("/start")
    public ResponseEntity<Integer> startRecord(@RequestBody DayVO day){
        if(service.insertDayRec(day))
            return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Integer>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping("/route")
    public ResponseEntity<Integer> saveRoute(@RequestBody RouteVO pos){
        if(service.insertRoute(pos))
            return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Integer>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping("/receipt")
    public ResponseEntity<Integer> saveConsume(@RequestBody ConsumeVO consume){
        if(service.insertConsumption(consume))
            return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
        else
            return new ResponseEntity<Integer>(FAIL, HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/time")
    public ResponseEntity<Integer> getRecordTime(){
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/distance")
    public ResponseEntity<Integer> getTotalDistance(){
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/receipt")
    public ResponseEntity<Integer> getConsume(){
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
    }

    @GetMapping("/pictures")
    public ResponseEntity<Integer> getPictures(){
        return new ResponseEntity<Integer>(SUCCESS, HttpStatus.OK);
    }
}
