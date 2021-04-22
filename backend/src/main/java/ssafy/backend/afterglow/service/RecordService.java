package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.repository.RecordRepository;

@Service
public class RecordService {
    @Autowired
    RecordRepository repo;


}
