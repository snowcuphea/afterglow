package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.dto.*;
import ssafy.backend.afterglow.repository.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

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
    ImageRepository imgRepo;

    public Long getRecTotalTime(Long recId) {
        Optional<Record> rec = recRepo.findById(recId);
        if(rec.isPresent()){
            List<DailyRecord> dayRec = dayRepo.findByRec(rec.get());
            Long totalTime = 0L;
            for(DailyRecord day : dayRec)
                totalTime += ChronoUnit.HOURS.between(day.getDrStartTime(), day.getDrEndTime());
            return totalTime;
        }
        else
            return null;
    }

    public Optional<RouteRecord> findNearestRr(Long drId, Double longitude, Double latitude) {
        Optional<DailyRecord> dr = dayRepo.findById(drId);
        if (dr.isPresent()) {
            List<RouteRecord> rrList = rouRepo.findByDr(dr.get());
            AtomicReference<RouteRecord> nearestRr = new AtomicReference<>(rrList.get(0));
            Double nearestDist = getDist(nearestRr.get(), longitude, latitude);
            rrList
                    .stream()
                    .forEach(rr -> {
                        if (getDist(rr, longitude, latitude) < nearestDist) {
                            nearestRr.set(rr);
                        }
                    });
            return Optional.ofNullable(nearestRr.get());
        } else {
            return null;
        }
    }

    public Double getDist(RouteRecord rr, Double Longitude, Double Latitude) {
        return Math.sqrt(Math.pow(rr.getRrLatitude() - Latitude, 2) + Math.pow(rr.getRrLongitude() - Longitude, 2));
    }
}
