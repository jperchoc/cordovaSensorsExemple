/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 /*
 * Author: Jonathan Perchoc
 * Date:   24/09/2020
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var timer = null;
var position;
var acceleration;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    //Add volume buttons events:
    document.addEventListener("volumeupbutton", handleButtonEvent, false);
    document.addEventListener("volumedownbutton", handleButtonEvent, false);
    //start watching gps
    navigator.geolocation.watchPosition((pos) => {position = pos;}, (error) => handleError(error), {timeout: 100, enableHighAccuracy: true });
    //start watching acceleration
    navigator.accelerometer.watchAcceleration((acc) => {acceleration = acc;}, (error) => handleError(error), { frequency: 100 });
}

function handleButtonEvent() {
    //Set position in html
    if (position) {
        document.getElementById('gpsData').innerHTML = ""
        + "   timestamp: " + position.timestamp
        + "\n   lati: "      + position.coords.latitude
        + "\n   long: "      + position.coords.longitude
        + "\n   alti: "      + position.coords.altitude
        + "\n   heading: "   + position.coords.heading
        + "\n   speed: "     + position.coords.speed
        + "\n   accuracy: "  + position.coords.accuracy;
    }
    //Set accemeration in html
    document.getElementById('accelerometerData').innerHTML = ""
    + "   timestamp: " + acceleration.timestamp
    + "\n   X: "      + acceleration.x
    + "\n   Y: "      + acceleration.y
    + "\n   Z: "      + acceleration.z;
    //TODO: save to file / db
}

function handleError(error) {
    //TODO: log error to error file / db
    console.log('ca marche pas uesh');
}

function startOrStopTimer() {
    if (!timer) {
        timer = setInterval(handleButtonEvent, 100) 
    } else {
        clearInterval(timer);
        timer = null;
    }
}