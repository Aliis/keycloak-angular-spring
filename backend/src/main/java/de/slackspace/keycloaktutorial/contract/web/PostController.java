package de.slackspace.keycloaktutorial.contract.web;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import de.slackspace.keycloaktutorial.contract.domain.Contract;

@RestController
@RequestMapping(value = "/api/post")
public class PostController {

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public List<Contract> getContracts() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Contract a = new Contract("post - called by user: " + createUserAppendix(auth.getName()));
        List<Contract> contracts = new ArrayList<>();
        contracts.add(a);
        return contracts;
    }

    private String createUserAppendix(String username) {
        return username;
    }
}
