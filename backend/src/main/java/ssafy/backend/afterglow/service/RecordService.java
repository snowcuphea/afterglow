package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.repository.*;

import java.util.List;
import java.util.Optional;

@Service
public class RecordService {
    @Autowired
    UserRepository userRepo;

    @Autowired
    RecordRepository recRepo;

    @Autowired
    DailyRepository dayRepo;

    @Autowired
    RouteRepository rouRepo;

    @Autowired
    ConsumptionRepository conRepo;

    @Autowired
    PinRepository pinRepo;

    @Autowired
    ImageRepository imgRepo;

    public Optional<Record> insertRec(Long userId, String recName){
        try{
            User user = userRepo.findById(userId).get();
            Record rec = Record.builder().user(user).recName(recName).build();
            return Optional.ofNullable(recRepo.save(rec));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Optional<Record> selectRec(Long recId){
        return recRepo.findById(recId);
    }

    public Optional<Record> selectCurrent(Long dayRecId){

        return null;
    }

    public String getRecTotalTime(Integer recId){
        // dr.drStartTime
        // dr.drEndTime
        // Period - 날짜 차이
        // Duration - 시간 차이

        return null;
    }

}
