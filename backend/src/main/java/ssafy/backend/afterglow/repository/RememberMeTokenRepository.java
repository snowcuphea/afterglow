package ssafy.backend.afterglow.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.stereotype.Repository;
import ssafy.backend.afterglow.domain.PersistentLogins;

import java.util.Date;
import java.util.Optional;

public class RememberMeTokenRepository implements PersistentTokenRepository {
    @Autowired
    RememberMeRepository rememberMeRepository;

    @Override
    public void createNewToken(PersistentRememberMeToken token) {
        PersistentLogins pl = new PersistentLogins(token);
        rememberMeRepository.save(pl);
    }

    @Override
    public void updateToken(String series, String tokenValue, Date lastUsed) {
        Optional<PersistentLogins> pl = rememberMeRepository.findBySeries(series);
        if (pl.isPresent()){
            pl.get().setToken(tokenValue);
            pl.get().setLastUsed(lastUsed);
        }
    }

    @Override
    public PersistentRememberMeToken getTokenForSeries(String seriesId) {
        Optional<PersistentLogins> pl = rememberMeRepository.findBySeries(seriesId);
        if (pl.isPresent()) {
            return new PersistentRememberMeToken(pl.get().getUsername(), pl.get().getSeries(), pl.get().getToken(), pl.get().getLastUsed());
        } else {
            return null;
        }
    }

    @Override
    public void removeUserTokens(String username) {
        rememberMeRepository.deleteByUsername(username);
    }
}
