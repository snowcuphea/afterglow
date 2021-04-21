package ssafy.backend.afterglow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.backend.afterglow.domain.Record;

@RestController
@RequestMapping("records")
public class RecordController {
    @GetMapping("/records")
    public ResponseEntity<Record> sampleFunction(@PathVariable("recordId") Integer id){
        return null;
    }
}
