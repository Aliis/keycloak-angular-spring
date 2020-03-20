package de.slackspace.keycloaktutorial.contract.web;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/api/logout")
public class LogoutController {

    @RequestMapping(method = RequestMethod.GET)
    public void getContracts(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        new SecurityContextLogoutHandler().logout(httpServletRequest, httpServletResponse, auth);
        SecurityContextHolder.clearContext();
        System.out.println("logout");
    }
}
