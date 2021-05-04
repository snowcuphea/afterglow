package ssafy.backend.afterglow.controller;

<<<<<<< Updated upstream
=======
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
<<<<<<< Updated upstream
import ssafy.backend.afterglow.VO.*;
import ssafy.backend.afterglow.service.RecordService;

=======
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

>>>>>>> Stashed changes
@RestController
@RequestMapping("records")
public class RecordController {
    static final int SUCCESS = 1;
    static final int FAIL = -1;

    @Autowired
    RecordService service;

<<<<<<< Updated upstream
=======
    private final ImageRepository imagerepository;
    private final UserRepository userRepository;
    private final RecordRepository recordRepository;

>>>>>>> Stashed changes
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
