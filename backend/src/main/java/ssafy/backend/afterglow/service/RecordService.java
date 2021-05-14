package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.dto.*;
import ssafy.backend.afterglow.repository.*;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

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

    public Boolean isUserMoving(RouteRecord latestRr, Double latitude, Double longitude) {
        return getDist(latestRr.getRrLatitude(), latestRr.getRrLongitude(), latitude, longitude) > 0.1;
    }

    public RouteRecord getLatestRr(DailyRecord dr) {
        List<RouteRecord> rrList = rouRepo.findByDr(dr);
        return rrList.get(rrList.size() - 1);
    }

    public Optional<RouteRecord> findNearestRr(Long drId, Double longitude, Double latitude, Timestamp timestamp) {
        var ref = new Object() {
            Optional<RouteRecord> result;
        };
        dayRepo.findById(drId).
                ifPresent(dr -> {

                    ref.result = rouRepo.findByDr(dr)
                            .stream()
                            .min(new Comparator<RouteRecord>() {
                                @Override
                                public int compare(RouteRecord rr1, RouteRecord rr2) {
                                    return Duration.between(rr1.getRrTime(), (Temporal) timestamp).compareTo(Duration.between(rr2.getRrTime(), (Temporal) timestamp));
                                }
                            });
                });
        return ref.result;
    }

    public Double getDistBtwRr(RouteRecord rr1, RouteRecord rr2) {
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
