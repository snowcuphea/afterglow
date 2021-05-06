package ssafy.backend.afterglow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssafy.backend.afterglow.domain.*;
import ssafy.backend.afterglow.dto.*;
import ssafy.backend.afterglow.repository.*;

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
    PinRepository pinRepo;

    @Autowired
    ImageRepository imgRepo;

    public Optional<Record> insertRec(Long userId, String recName){
        Optional<User> user = userRepo.findById(userId);
        if(user.isPresent()){
            Record rec = Record.builder().user(user.get()).recName(recName).build();
            return Optional.ofNullable(recRepo.save(rec));
        }
        else{
            return null;
        }
    }

    public RecordDTO selectRecordInfo(Long recId){
        Optional<Record> rec = recRepo.findById(recId);
        if(rec.isPresent()){
            Record rEntity = rec.get();
            List<DailyRecord> dayEntity = rEntity.getDayRecs();
            List<List<RouteRecord>> routeEntity = new ArrayList<>();
            List<List<ConsumptionRecord>> conEntity = new ArrayList<>();
            List<List<List<PinRecord>>> pinEntity = new ArrayList<>();
            List<List<List<ImageRecord>>> imgEntity = new ArrayList<>();
            for(DailyRecord dRec : dayEntity){
                routeEntity.add(dRec.getRouteRecs());
                conEntity.add(dRec.getConRecs());
            }
            for(List<RouteRecord> list : routeEntity){
                List<List<PinRecord>> pTemp = new ArrayList<>();
                List<List<ImageRecord>> iTemp = new ArrayList<>();
                for(RouteRecord rRec : list){
                    pTemp.add(rRec.getPinRecs());
                    iTemp.add(rRec.getImgRecs());
                }
                pinEntity.add(pTemp);
                imgEntity.add(iTemp);
            }

            List<List<List<PinDTO>>> prDTO = new ArrayList<>();
            List<List<List<ImageDTO>>> irDTO = new ArrayList<>();
            List<List<RouteDTO>> rrDTO = new ArrayList<>();
            List<List<ConsumptionDTO>> crDTO = new ArrayList<>();
            List<DailyRecordDTO> drDTO = new ArrayList<>();
            for(List<List<PinRecord>> pDList : pinEntity){
                List<List<PinDTO>> dTemp = new ArrayList<>();
                for(List<PinRecord> pList : pDList){
                    List<PinDTO> temp = new ArrayList<>();
                    for(PinRecord pr : pList){
                        temp.add(PinDTO.builder()
                                .pinId(pr.getPinId())
                                .prName(pr.getPrName())
                                .prMemo(pr.getPrMemo())
                                .build());
                    }
                    dTemp.add(temp);
                }
                prDTO.add(dTemp);
            }
            for(List<List<ImageRecord>> iDList : imgEntity){
                List<List<ImageDTO>> dTemp = new ArrayList<>();
                for(List<ImageRecord> iList : iDList){
                    List<ImageDTO> temp = new ArrayList<>();
                    for(ImageRecord ir : iList){
                        temp.add(ImageDTO.builder()
                                .imgId(ir.getImgId())
                                .irImage(ir.getIrImage())
                                .build());
                    }
                    dTemp.add(temp);
                }
                irDTO.add(dTemp);
            }

            for(int i=0; i<routeEntity.size(); i++){
                List<RouteDTO> temp = new ArrayList<>();
                for(int j=0; j<routeEntity.get(i).size(); j++){
                    temp.add(RouteDTO.builder()
                            .rrId(routeEntity.get(i).get(j).getRrId())
                            .rrLatitude(routeEntity.get(i).get(j).getRrLatitude())
                            .rrLongitude(routeEntity.get(i).get(j).getRrLongitude())
                            .rrTime(routeEntity.get(i).get(j).getRrTime())
                            .pins(prDTO.get(i).get(j))
                            .images(irDTO.get(i).get(j))
                            .build());
                }
                rrDTO.add(temp);
            }
            for(int i=0; i<conEntity.size(); i++){
                List<ConsumptionDTO> temp = new ArrayList<>();
                for(int j=0; j<conEntity.get(i).size(); j++){
                    temp.add(ConsumptionDTO.builder()
                            .crId(conEntity.get(i).get(j).getCrId())
                            .crName(conEntity.get(i).get(j).getCrName())
                            .crMoney(conEntity.get(i).get(j).getCrMoney())
                            .crDatetime(conEntity.get(i).get(j).getCrDatetime())
                            .build());
                }
                crDTO.add(temp);
            }
            for(int i=0; i<dayEntity.size(); i++){
                drDTO.add(DailyRecordDTO.builder()
                        .drId(dayEntity.get(i).getDrId())
                        .drDay(dayEntity.get(i).getDrDay())
                        .drStartTime(dayEntity.get(i).getDrStartTime())
                        .drEndTime(dayEntity.get(i).getDrEndTime())
                        .routes(rrDTO.get(i))
                        .cons(crDTO.get(i))
                        .build());
            }
            return RecordDTO.builder()
                    .recId(rEntity.getRecId())
                    .recName(rEntity.getRecName())
                    .days(drDTO)
                    .build();
        }
        else
            return null;
    }

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

    public String insertConsumption(){
        return null;
    }

    public String updateConsumption(){
        return null;
    }

    public Optional<PinRecord> insertMemo(Long routeId, String pinName, String pinMemo){
        Optional<RouteRecord> route = rouRepo.findById(routeId);
        if(route.isPresent()){
            PinRecord pin = PinRecord.builder()
                    .prName(pinName)
                    .prMemo(pinMemo)
                    .rr(route.get())
                    .build();
            return Optional.ofNullable(pinRepo.save(pin));
        }
        else
            return null;
    }

    public Optional<PinRecord> modifyMemo(Long pinId, String pinMemo){
        Optional<PinRecord> pin = pinRepo.findById(pinId);
        if(pin.isPresent()){
            pin.get().setPrMemo(pinMemo);
            return Optional.ofNullable(pinRepo.save(pin.get()));
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
