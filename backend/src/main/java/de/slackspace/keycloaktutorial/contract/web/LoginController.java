package de.slackspace.keycloaktutorial.contract.web;

import de.slackspace.keycloaktutorial.contract.domain.Contract;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/login")
public class LoginController {

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public boolean getContracts() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.isAuthenticated();
    }
}