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
        if (rec.isPresent()) {
            List<DailyRecord> dayRec = dayRepo.findByRec(rec.get());
            Long totalTime = 0L;
            for (DailyRecord day : dayRec)
                totalTime += ChronoUnit.HOURS.between(day.getDrStartTime(), day.getDrEndTime());
            return totalTime;
        } else
            return null;
    }

    public Optional<RouteRecord> findNearestRr(Long drId, Double longitude, Double latitude) {
        Optional<DailyRecord> dr = dayRepo.findById(drId);
        if (dr.isPresent()) {
            List<RouteRecord> rrList = rouRepo.findByDr(dr.get());
            var ref = new Object() {
                RouteRecord nearestRr = rrList.get(0);
            };
            Double nearestDist = getDist(ref.nearestRr.getRrLatitude(), ref.nearestRr.getRrLongitude(), latitude, longitude);
            rrList
                    .stream()
                    .forEach(rr -> {
                        if (getDist(rr.getRrLatitude(), rr.getRrLongitude(), latitude, longitude) < nearestDist) {
                            ref.nearestRr = rr;
                        }
                    });
            return Optional.ofNullable(ref.nearestRr);
        } else {
            return null;
        }
    }

    public Double getDistBtwRr(RouteRecord rr1, RouteRecord rr2){
        return getDist(rr1.getRrLatitude(), rr1.getRrLongitude(), rr2.getRrLatitude(), rr2.getRrLongitude());
    }

    public Double getDist(double lat1, double lon1, double lat2, double lon2) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;

        dist = dist * 1.609344;

        return (dist);
    }

    public static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    public static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}
