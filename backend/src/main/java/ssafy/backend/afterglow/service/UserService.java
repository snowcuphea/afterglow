package ssafy.backend.afterglow.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class UserService {

    @RequestMapping(value="/login/oauth2/code/kakao")
    public String login(@RequestParam("code") String code) {
        System.out.println("controller access_token : " + code);

        return "index";
    }
}
