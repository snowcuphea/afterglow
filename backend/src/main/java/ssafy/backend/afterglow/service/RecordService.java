package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.repository.*;

import java.time.Duration;
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
        // 어느 정도의 정보가 필요한지 모르겟음?
        return null;
    }

    public String getRecTotalTime(Long recId){
        Optional<Record> rec = recRepo.findById(recId);
        if(rec.isPresent()){
            List<DailyRecord> dayRec = dayRepo.findByRec(rec.get());
//            dayRec.forEach(day -> {Duration dur = Duration.between(day.getDrStartTime(), day.getDrEndTime())});
            return null;
        }
        else
            return null;
    }

}
