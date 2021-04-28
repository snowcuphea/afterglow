package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.VO.ConsumeVO;
import ssafy.backend.afterglow.VO.DayVO;
import ssafy.backend.afterglow.VO.RecVO;
import ssafy.backend.afterglow.VO.RouteVO;
import ssafy.backend.afterglow.domain.ConsumptionRecord;
import ssafy.backend.afterglow.domain.DailyRecord;
import ssafy.backend.afterglow.domain.Record;
import ssafy.backend.afterglow.domain.RouteRecord;
import ssafy.backend.afterglow.repository.*;

import java.util.List;

@Service
public class RecordService {
    @Autowired
    RecordRepository repo;

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

    public boolean insertRec(RecVO vo){
        try{
            Record rec = Record.builder().user(vo.getUser()).recName(vo.getRecName()).build();
            repo.save(rec);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean insertDayRec(DayVO vo){
        try{
            DailyRecord rec = DailyRecord.builder().rec(vo.getRec()).drStartTime(vo.getStartTime()).build();
            dayRepo.save(rec);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean insertRoute(RouteVO vo){
        try{
            RouteRecord rec = RouteRecord.builder().dr(vo.getDr()).rrLatitude(vo.getLatitude()).rrLongitude(vo.getLongitude()).build();
            rouRepo.save(rec);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean insertConsumption(ConsumeVO vo){
        try{
            ConsumptionRecord rec = ConsumptionRecord.builder().crName(vo.getName()).crMoney(vo.getMoney()).crDatetime(vo.getDateTime()).build();
            conRepo.save(rec);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getRecTotalTime(Integer recId){
        // dr.drStartTime
        // dr.drEndTime
        // Period - 날짜 차이
        // Duration - 시간 차이

        return null;
    }

}
