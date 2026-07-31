<p align="center">
	<h1 align="center">What's Your IP?</h1>
</p>

What's Your IP..? is a simple web application that lets you look up information about an IP address. Enter any IPv4 or IPv6 address to view useful details along with its location on an interactive map...

## What it does

What's Your IP? lets you:

* look up information about any IP address..
* view country, city, region, ISP and ASN details..
* check whether the IP belongs to a datacenter, mobile network or residential network..
* see the IP's approximate location on an interactive Leaflet map..

The project focuses on providing a clean and easy way to explore UI.

## Motivation

I built this project mainly to learn and experiment with Leaflet... I wanted to understand how interactive maps work and can be used in projects.

## Tech Stack

* React Vite
* Leaflet
* IP Geolocation API

## The "How It Works" Deep Dive

Recently, I also added a detailed "How it works" section right inside the app... A lot of people think an IP address magically hides your exact GPS coordinates, but that's actually a huge misconception.. 

In the app, I've explained exactly what happens behind the scenes in really simple terms:
* **Who owns every IP?** How organizations like Regional Internet Registries (RIRs) allocate entire IP ranges to companies like Google, AWS, and Jio..
* **WHOIS Records:** How anyone can look up who officially owns an IP block..
* **ASNs and BGP Routing:** The real backbone of the internet! How ISPs announce their network routes globally so traffic knows exactly where to go..
* **City-level tracking:** How companies estimate your city by observing thousands of devices, network topography, and cell data over time (no, they don't actually know your street address).. 
* **Blazing fast lookups:** How converting IPs into integers makes searching through millions of database records take just a few milliseconds...

It's super fascinating to learn how all these networking standards, global coordination, and databases work together just to map an IP to a city..

If you're curious to read the full breakdown and see it all in action, you can check it out live here: **[https://whats-your-ip-human.vercel.app](https://whats-your-ip-human.vercel.app)** .. Just click the "How it works" button in the app to dive in!
