package com.fluxgate.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/gateway")
public class GatewayController {
    @GetMapping("/data")
    public Map<String, Object> getData() {

        List<Map<String, Object>> osList = new ArrayList<>();

        // LINUX DISTROS

        Map<String, Object> ubuntu = new HashMap<>();
        ubuntu.put("family", "Linux");
        ubuntu.put("name", "Ubuntu");
        ubuntu.put("version", "24.04 LTS");
        ubuntu.put("kernel", "6.8");
        ubuntu.put("desktop", "GNOME");
        ubuntu.put("releaseYear", "2024");
        ubuntu.put("message", "Stable and beginner friendly.");
        osList.add(ubuntu);

        Map<String, Object> debian = new HashMap<>();
        debian.put("family", "Linux");
        debian.put("name", "Debian");
        debian.put("version", "12 Bookworm");
        debian.put("kernel", "6.x");
        debian.put("desktop", "GNOME");
        debian.put("releaseYear", "2023");
        debian.put("message", "The universal operating system.");
        osList.add(debian);

        Map<String, Object> mint = new HashMap<>();
        mint.put("family", "Linux");
        mint.put("name", "Linux Mint");
        mint.put("version", "22");
        mint.put("kernel", "6.x");
        mint.put("desktop", "Cinnamon");
        mint.put("releaseYear", "2024");
        mint.put("message", "Windows users feel at home.");
        osList.add(mint);

        Map<String, Object> fedora = new HashMap<>();
        fedora.put("family", "Linux");
        fedora.put("name", "Fedora");
        fedora.put("version", "40");
        fedora.put("kernel", "6.x");
        fedora.put("desktop", "GNOME");
        fedora.put("releaseYear", "2024");
        fedora.put("message", "Latest open-source innovations.");
        osList.add(fedora);

        Map<String, Object> arch = new HashMap<>();
        arch.put("family", "Linux");
        arch.put("name", "Arch Linux");
        arch.put("version", "Rolling Release");
        arch.put("kernel", "Latest");
        arch.put("desktop", "Custom");
        arch.put("releaseYear", "Continuous");
        arch.put("message", "Built your way.");
        osList.add(arch);

        Map<String, Object> manjaro = new HashMap<>();
        manjaro.put("family", "Linux");
        manjaro.put("name", "Manjaro");
        manjaro.put("version", "24");
        manjaro.put("kernel", "6.x");
        manjaro.put("desktop", "XFCE");
        manjaro.put("releaseYear", "2024");
        manjaro.put("message", "Arch made easier.");
        osList.add(manjaro);

        Map<String, Object> popos = new HashMap<>();
        popos.put("family", "Linux");
        popos.put("name", "Pop!_OS");
        popos.put("version", "22.04");
        popos.put("kernel", "6.x");
        popos.put("desktop", "COSMIC");
        popos.put("releaseYear", "2024");
        popos.put("message", "Made for creators and developers.");
        osList.add(popos);

        // WINDOWS

        Map<String, Object> xp = new HashMap<>();
        xp.put("family", "Windows");
        xp.put("name", "Windows XP");
        xp.put("version", "5.1");
        xp.put("releaseYear", "2001");
        xp.put("status", "Legacy");
        xp.put("message", "Still alive in old offices.");
        osList.add(xp);

        Map<String, Object> win7 = new HashMap<>();
        win7.put("family", "Windows");
        win7.put("name", "Windows 7");
        win7.put("version", "6.1");
        win7.put("releaseYear", "2009");
        win7.put("status", "Loved");
        win7.put("message", "One of the best Windows releases.");
        osList.add(win7);

        Map<String, Object> win8 = new HashMap<>();
        win8.put("family", "Windows");
        win8.put("name", "Windows 8.1");
        win8.put("version", "6.3");
        win8.put("releaseYear", "2013");
        win8.put("status", "Mixed");
        win8.put("message", "Tiles everywhere.");
        osList.add(win8);

        Map<String, Object> win10 = new HashMap<>();
        win10.put("family", "Windows");
        win10.put("name", "Windows 10");
        win10.put("version", "22H2");
        win10.put("releaseYear", "2015");
        win10.put("status", "Popular");
        win10.put("message", "Reliable daily driver.");
        osList.add(win10);

        Map<String, Object> win11 = new HashMap<>();
        win11.put("family", "Windows");
        win11.put("name", "Windows 11");
        win11.put("version", "23H2");
        win11.put("releaseYear", "2021");
        win11.put("status", "Current");
        win11.put("message", "Modern UI and centered taskbar.");
        osList.add(win11);

        // macOS

        Map<String, Object> monterey = new HashMap<>();
        monterey.put("family", "macOS");
        monterey.put("name", "macOS Monterey");
        monterey.put("version", "12");
        monterey.put("kernel", "Darwin");
        monterey.put("releaseYear", "2021");
        monterey.put("message", "Stable Apple ecosystem.");
        osList.add(monterey);

        Map<String, Object> ventura = new HashMap<>();
        ventura.put("family", "macOS");
        ventura.put("name", "macOS Ventura");
        ventura.put("version", "13");
        ventura.put("kernel", "Darwin");
        ventura.put("releaseYear", "2022");
        ventura.put("message", "Productive and polished.");
        osList.add(ventura);

        Map<String, Object> sonoma = new HashMap<>();
        sonoma.put("family", "macOS");
        sonoma.put("name", "macOS Sonoma");
        sonoma.put("version", "14");
        sonoma.put("kernel", "Darwin");
        sonoma.put("releaseYear", "2023");
        sonoma.put("message", "Widgets on desktop.");
        osList.add(sonoma);

        Map<String, Object> sequoia = new HashMap<>();
        sequoia.put("family", "macOS");
        sequoia.put("name", "macOS Sequoia");
        sequoia.put("version", "15");
        sequoia.put("kernel", "Darwin");
        sequoia.put("releaseYear", "2024");
        sequoia.put("message", "Apple intelligence era.");
        osList.add(sequoia);

        // RANDOM RESPONSE

        Random random = new Random();
        Map<String, Object> response = osList.get(random.nextInt(osList.size()));

        response.put("servedBy", "FluxOS");
        response.put("gateway", "FluxOS API Gateway");
        response.put("status", "success");

        return response;
    }
}
