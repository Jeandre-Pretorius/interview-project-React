import React, { useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import Sidebar from './components/Sidebar';
import './App.css';
import '@fontsource/inter';

// Mapbox token
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const [viewState, setViewState] = useState({
    longitude: 28.0473,
    latitude: -26.2041,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Dummy data for the heatmap layer
  const data = [
    {
      "city": "Johannesburg", 
      "lat": "-26.2044", 
      "lng": "28.0456", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "admin", 
      "population": "8500000", 
      "population_proper": "4434827"
    }, 
    {
      "city": "Cape Town", 
      "lat": "-33.9253", 
      "lng": "18.4239", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "primary", 
      "population": "4770313", 
      "population_proper": "4770313"
    }, 
    {
      "city": "Soweto", 
      "lat": "-26.2678", 
      "lng": "27.8585", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "1271628", 
      "population_proper": "1271628"
    }, 
    {
      "city": "Gqeberha", 
      "lat": "-33.9581", 
      "lng": "25.6000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "967677", 
      "population_proper": "967677"
    }, 
    {
      "city": "Pietermaritzburg", 
      "lat": "-29.6167", 
      "lng": "30.3833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "admin", 
      "population": "839327", 
      "population_proper": "839327"
    }, 
    {
      "city": "Durban", 
      "lat": "-29.8833", 
      "lng": "31.0500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "838634", 
      "population_proper": "536644"
    }, 
    {
      "city": "Pretoria", 
      "lat": "-25.7461", 
      "lng": "28.1881", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "primary", 
      "population": "741651", 
      "population_proper": "741651"
    }, 
    {
      "city": "Rustenburg", 
      "lat": "-25.6667", 
      "lng": "27.2428", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "549575", 
      "population_proper": "549575"
    }, 
    {
      "city": "Newcastle", 
      "lat": "-27.7464", 
      "lng": "29.9328", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "507710", 
      "population_proper": "507710"
    }, 
    {
      "city": "East London", 
      "lat": "-33.0175", 
      "lng": "27.9047", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "478676", 
      "population_proper": "478676"
    }, 
    {
      "city": "Katlehong", 
      "lat": "-26.3333", 
      "lng": "28.1500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "467890", 
      "population_proper": "467890"
    }, 
    {
      "city": "Khayelitsha", 
      "lat": "-34.0403", 
      "lng": "18.6778", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "391749", 
      "population_proper": "391749"
    }, 
    {
      "city": "Randburg", 
      "lat": "-26.0936", 
      "lng": "28.0064", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "337053", 
      "population_proper": "337053"
    }, 
    {
      "city": "Roodepoort", 
      "lat": "-26.1625", 
      "lng": "27.8725", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "326416", 
      "population_proper": "326416"
    }, 
    {
      "city": "Mitchells Plain", 
      "lat": "-34.0506", 
      "lng": "18.6181", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "310485", 
      "population_proper": "310485"
    }, 
    {
      "city": "Boksburg", 
      "lat": "-26.2125", 
      "lng": "28.2625", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "260321", 
      "population_proper": "260321"
    }, 
    {
      "city": "Bloemfontein", 
      "lat": "-29.1167", 
      "lng": "26.2167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "primary", 
      "population": "256185", 
      "population_proper": "256185"
    }, 
    {
      "city": "Germiston", 
      "lat": "-26.2178", 
      "lng": "28.1672", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "255863", 
      "population_proper": "255863"
    }, 
    {
      "city": "Centurion", 
      "lat": "-25.8603", 
      "lng": "28.1894", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "236580", 
      "population_proper": "236580"
    }, 
    {
      "city": "Kimberley", 
      "lat": "-28.7383", 
      "lng": "24.7639", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Northern Cape", 
      "capital": "admin", 
      "population": "225160", 
      "population_proper": "225160"
    }, 
    {
      "city": "Sandton", 
      "lat": "-26.1070", 
      "lng": "28.0517", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "222415", 
      "population_proper": "222415"
    }, 
    {
      "city": "Klerksdorp", 
      "lat": "-26.8667", 
      "lng": "26.6667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "186515", 
      "population_proper": "186515"
    }, 
    {
      "city": "Bethelsdorp", 
      "lat": "-33.8833", 
      "lng": "25.5000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "182012", 
      "population_proper": "182012"
    }, 
    {
      "city": "Kempton Park", 
      "lat": "-26.1000", 
      "lng": "28.2333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "171575", 
      "population_proper": "171575"
    }, 
    {
      "city": "Nqutu", 
      "lat": "-28.2320", 
      "lng": "30.5660", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "170307", 
      "population_proper": "170307"
    }, 
    {
      "city": "Kroonstad", 
      "lat": "-27.6500", 
      "lng": "27.2333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "168762", 
      "population_proper": "168762"
    }, 
    {
      "city": "Benoni", 
      "lat": "-26.1883", 
      "lng": "28.3206", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "158777", 
      "population_proper": "158777"
    }, 
    {
      "city": "George", 
      "lat": "-33.9667", 
      "lng": "22.4500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "157394", 
      "population_proper": "157394"
    }, 
    {
      "city": "Potchefstroom", 
      "lat": "-26.7150", 
      "lng": "27.1033", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "148804", 
      "population_proper": "148804"
    }, 
    {
      "city": "Pinetown", 
      "lat": "-29.8167", 
      "lng": "30.8500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "144026", 
      "population_proper": "144026"
    }, 
    {
      "city": "Krugersdorp", 
      "lat": "-26.1000", 
      "lng": "27.7667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "140643", 
      "population_proper": "140643"
    }, 
    {
      "city": "Mthatha", 
      "lat": "-31.5800", 
      "lng": "28.7900", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "137772", 
      "population_proper": "137772"
    }, 
    {
      "city": "Polokwane", 
      "lat": "-23.9000", 
      "lng": "29.4500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "admin", 
      "population": "130028", 
      "population_proper": "130028"
    }, 
    {
      "city": "Springs", 
      "lat": "-26.2547", 
      "lng": "28.4428", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "121610", 
      "population_proper": "121610"
    }, 
    {
      "city": "Alberton", 
      "lat": "-26.2672", 
      "lng": "28.1219", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "121536", 
      "population_proper": "121536"
    }, 
    {
      "city": "Upington", 
      "lat": "-28.4500", 
      "lng": "21.2500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Northern Cape", 
      "capital": "", 
      "population": "121189", 
      "population_proper": "121189"
    }, 
    {
      "city": "Winterveld", 
      "lat": "-25.4200", 
      "lng": "27.9490", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "120826", 
      "population_proper": "120826"
    }, 
    {
      "city": "Parow", 
      "lat": "-33.9000", 
      "lng": "18.6000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "119462", 
      "population_proper": "119462"
    }, 
    {
      "city": "Paarl", 
      "lat": "-33.7242", 
      "lng": "18.9558", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "112045", 
      "population_proper": "112045"
    }, 
    {
      "city": "Empangeni", 
      "lat": "-28.7500", 
      "lng": "31.9000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "110340", 
      "population_proper": "110340"
    }, 
    {
      "city": "Witbank", 
      "lat": "-25.8770", 
      "lng": "29.2010", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "108673", 
      "population_proper": "108673"
    }, 
    {
      "city": "Uitenhage", 
      "lat": "-33.7667", 
      "lng": "25.4000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "103639", 
      "population_proper": "103639"
    }, 
    {
      "city": "KwaDukuza", 
      "lat": "-29.3333", 
      "lng": "31.2917", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "101224", 
      "population_proper": "101224"
    }, 
    {
      "city": "Worcester", 
      "lat": "-33.6450", 
      "lng": "19.4436", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "97098", 
      "population_proper": "97098"
    }, 
    {
      "city": "Grahamstown", 
      "lat": "-33.2996", 
      "lng": "26.5200", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "91548", 
      "population_proper": "91548"
    }, 
    {
      "city": "Oudtshoorn", 
      "lat": "-33.5833", 
      "lng": "22.2000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "90822", 
      "population_proper": "90822"
    }, 
    {
      "city": "Ermelo", 
      "lat": "-26.5333", 
      "lng": "29.9833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "83865", 
      "population_proper": "83865"
    }, 
    {
      "city": "Stellenbosch", 
      "lat": "-33.9367", 
      "lng": "18.8614", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "77476", 
      "population_proper": "77476"
    }, 
    {
      "city": "Sasolburg", 
      "lat": "-26.8142", 
      "lng": "27.8286", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "76349", 
      "population_proper": "76349"
    }, 
    {
      "city": "Thaba Nchu", 
      "lat": "-29.2000", 
      "lng": "26.8333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "70118", 
      "population_proper": "70118"
    }, 
    {
      "city": "Kwamhlanga", 
      "lat": "-25.4320", 
      "lng": "28.7080", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "69853", 
      "population_proper": "69853"
    }, 
    {
      "city": "Thohoyandou", 
      "lat": "-22.9500", 
      "lng": "30.4833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "69453", 
      "population_proper": "69453"
    }, 
    {
      "city": "Queenstown", 
      "lat": "-31.9000", 
      "lng": "26.8833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "68872", 
      "population_proper": "68872"
    }, 
    {
      "city": "Odendaalsrus", 
      "lat": "-27.8667", 
      "lng": "26.6833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "63743", 
      "population_proper": "63743"
    }, 
    {
      "city": "Bethal", 
      "lat": "-26.4500", 
      "lng": "29.4500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "60779", 
      "population_proper": "60779"
    }, 
    {
      "city": "Mossel Bay", 
      "lat": "-34.1833", 
      "lng": "22.1333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "59031", 
      "population_proper": "59031"
    }, 
    {
      "city": "Wellington", 
      "lat": "-33.6333", 
      "lng": "18.9833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "55543", 
      "population_proper": "55543"
    }, 
    {
      "city": "Queensburgh", 
      "lat": "-29.8667", 
      "lng": "30.9333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "54846", 
      "population_proper": "54846"
    }, 
    {
      "city": "Phuthaditjhaba", 
      "lat": "-28.5333", 
      "lng": "28.8167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "54661", 
      "population_proper": "54661"
    }, 
    {
      "city": "Kokstad", 
      "lat": "-30.5539", 
      "lng": "29.4269", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "51561", 
      "population_proper": "51561"
    }, 
    {
      "city": "Edenvale", 
      "lat": "-26.1411", 
      "lng": "28.1528", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "49292", 
      "population_proper": "49292"
    }, 
    {
      "city": "Vryheid", 
      "lat": "-27.7669", 
      "lng": "30.8000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "47365", 
      "population_proper": "47365"
    }, 
    {
      "city": "Kuilsrivier", 
      "lat": "-33.9414", 
      "lng": "18.7066", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "46686", 
      "population_proper": "46686"
    }, 
    {
      "city": "Bothaville", 
      "lat": "-27.3833", 
      "lng": "26.6167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "46030", 
      "population_proper": "46030"
    }, 
    {
      "city": "Parys", 
      "lat": "-26.9000", 
      "lng": "27.4500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "45868", 
      "population_proper": "45868"
    }, 
    {
      "city": "Grabouw", 
      "lat": "-34.1500", 
      "lng": "19.0167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "44593", 
      "population_proper": "44593"
    }, 
    {
      "city": "Despatch", 
      "lat": "-33.8015", 
      "lng": "25.4768", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "39619", 
      "population_proper": "39619"
    }, 
    {
      "city": "Vredenburg", 
      "lat": "-32.9064", 
      "lng": "17.9958", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "38382", 
      "population_proper": "38382"
    }, 
    {
      "city": "Mmabatho", 
      "lat": "-25.8500", 
      "lng": "25.6333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "38297", 
      "population_proper": "38297"
    }, 
    {
      "city": "Lydenburg", 
      "lat": "-25.0960", 
      "lng": "30.4460", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "37258", 
      "population_proper": "37258"
    }, 
    {
      "city": "Siyabuswa", 
      "lat": "-25.1167", 
      "lng": "29.0500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "36882", 
      "population_proper": "36882"
    }, 
    {
      "city": "Namakgale", 
      "lat": "-23.9380", 
      "lng": "31.0280", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "36365", 
      "population_proper": "36365"
    }, 
    {
      "city": "Malmesbury", 
      "lat": "-33.4500", 
      "lng": "18.7333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "35897", 
      "population_proper": "35897"
    }, 
    {
      "city": "Lebowakgomo", 
      "lat": "-24.3050", 
      "lng": "29.5650", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "35087", 
      "population_proper": "35087"
    }, 
    {
      "city": "Phokeng", 
      "lat": "-25.5833", 
      "lng": "27.1333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "34597", 
      "population_proper": "34597"
    }, 
    {
      "city": "Westville", 
      "lat": "-29.8310", 
      "lng": "30.9250", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "30508", 
      "population_proper": "30508"
    }, 
    {
      "city": "Ulundi", 
      "lat": "-28.3167", 
      "lng": "31.4167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "29132", 
      "population_proper": "29132"
    }, 
    {
      "city": "Mondlo", 
      "lat": "-27.9670", 
      "lng": "30.7220", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "28871", 
      "population_proper": "28871"
    }, 
    {
      "city": "Saldanha", 
      "lat": "-32.9978", 
      "lng": "17.9456", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "28142", 
      "population_proper": "28142"
    }, 
    {
      "city": "Heilbron", 
      "lat": "-27.2836", 
      "lng": "27.9708", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "27407", 
      "population_proper": "27407"
    }, 
    {
      "city": "Jeffrey’s Bay", 
      "lat": "-34.0333", 
      "lng": "24.9167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "27107", 
      "population_proper": "27107"
    }, 
    {
      "city": "Frankfort", 
      "lat": "-27.2833", 
      "lng": "28.5167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "26144", 
      "population_proper": "26144"
    }, 
    {
      "city": "Giyani", 
      "lat": "-23.3100", 
      "lng": "30.7064", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "25954", 
      "population_proper": "25954"
    }, 
    {
      "city": "Mathibestad", 
      "lat": "-25.2760", 
      "lng": "28.1780", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "25945", 
      "population_proper": "25945"
    }, 
    {
      "city": "Mpophomeni", 
      "lat": "-29.5670", 
      "lng": "30.1820", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "25732", 
      "population_proper": "25732"
    }, 
    {
      "city": "Volksrust", 
      "lat": "-27.3667", 
      "lng": "29.8833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "24281", 
      "population_proper": "24281"
    }, 
    {
      "city": "uMhlanga Rocks", 
      "lat": "-29.7333", 
      "lng": "31.0708", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "24238", 
      "population_proper": "24238"
    }, 
    {
      "city": "Nkowakowa", 
      "lat": "-23.8860", 
      "lng": "30.2930", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "22484", 
      "population_proper": "22484"
    }, 
    {
      "city": "Robertson", 
      "lat": "-33.8000", 
      "lng": "19.8833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "21929", 
      "population_proper": "21929"
    }, 
    {
      "city": "Pampierstad", 
      "lat": "-27.7760", 
      "lng": "24.6900", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "21707", 
      "population_proper": "21707"
    }, 
    {
      "city": "Hammanskraal", 
      "lat": "-25.4000", 
      "lng": "28.2833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "21345", 
      "population_proper": "21345"
    }, 
    {
      "city": "Bronkhorstspruit", 
      "lat": "-25.8050", 
      "lng": "28.7464", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "20769", 
      "population_proper": "20769"
    }, 
    {
      "city": "Itsoseng", 
      "lat": "-26.0830", 
      "lng": "25.8820", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "19959", 
      "population_proper": "19959"
    }, 
    {
      "city": "Garsfontein", 
      "lat": "-25.7913", 
      "lng": "28.2935", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "19501", 
      "population_proper": "19501"
    }, 
    {
      "city": "Mooirivier", 
      "lat": "-29.2000", 
      "lng": "29.9833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "17779", 
      "population_proper": "17779"
    }, 
    {
      "city": "Kingsborough", 
      "lat": "-30.0833", 
      "lng": "30.8667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "16368", 
      "population_proper": "16368"
    }, 
    {
      "city": "Turffontein", 
      "lat": "-26.2446", 
      "lng": "28.0397", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "15887", 
      "population_proper": "15887"
    }, 
    {
      "city": "Alice", 
      "lat": "-32.7892", 
      "lng": "26.8350", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "15143", 
      "population_proper": "15143"
    }, 
    {
      "city": "Mahikeng", 
      "lat": "-25.8656", 
      "lng": "25.6436", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "admin", 
      "population": "15117", 
      "population_proper": "15117"
    }, 
    {
      "city": "Breyten", 
      "lat": "-26.3000", 
      "lng": "29.9833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "14347", 
      "population_proper": "14347"
    }, 
    {
      "city": "Primrose", 
      "lat": "-26.1833", 
      "lng": "28.1667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "14024", 
      "population_proper": "14024"
    }, 
    {
      "city": "Bedfordview", 
      "lat": "-26.1794", 
      "lng": "28.1361", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "13959", 
      "population_proper": "13959"
    }, 
    {
      "city": "eManzimtoti", 
      "lat": "-30.0500", 
      "lng": "30.8833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "13813", 
      "population_proper": "13813"
    }, 
    {
      "city": "Kirkwood", 
      "lat": "-33.4003", 
      "lng": "25.4425", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "13765", 
      "population_proper": "13765"
    }, 
    {
      "city": "Pretoria-Noord", 
      "lat": "-25.6731", 
      "lng": "28.1733", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "12972", 
      "population_proper": "12972"
    }, 
    {
      "city": "Elandsdoorn", 
      "lat": "-25.2880", 
      "lng": "29.1960", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "12941", 
      "population_proper": "12941"
    }, 
    {
      "city": "Buffelshoek", 
      "lat": "-24.6308", 
      "lng": "31.1383", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "12703", 
      "population_proper": "12703"
    }, 
    {
      "city": "Groutville", 
      "lat": "-29.3880", 
      "lng": "31.2450", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "12638", 
      "population_proper": "12638"
    }, 
    {
      "city": "Summerstrand", 
      "lat": "-33.9914", 
      "lng": "25.6569", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "12614", 
      "population_proper": "12614"
    }, 
    {
      "city": "Jeppe’s Reef", 
      "lat": "-25.7200", 
      "lng": "31.4770", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "12589", 
      "population_proper": "12589"
    }, 
    {
      "city": "Dysselsdorp", 
      "lat": "-33.5667", 
      "lng": "22.4333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "12544", 
      "population_proper": "12544"
    }, 
    {
      "city": "Matatiele", 
      "lat": "-30.3422", 
      "lng": "28.8061", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "12466", 
      "population_proper": "12466"
    }, 
    {
      "city": "eXobho", 
      "lat": "-30.1572", 
      "lng": "30.0647", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "12461", 
      "population_proper": "12461"
    }, 
    {
      "city": "Lenyenye", 
      "lat": "-23.9720", 
      "lng": "30.2690", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "12099", 
      "population_proper": "12099"
    }, 
    {
      "city": "Mount Fletcher", 
      "lat": "-30.6920", 
      "lng": "28.5030", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "11488", 
      "population_proper": "11488"
    }, 
    {
      "city": "Gonubie", 
      "lat": "-32.9430", 
      "lng": "28.0080", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "11471", 
      "population_proper": "11471"
    }, 
    {
      "city": "Mogogelo", 
      "lat": "-25.3540", 
      "lng": "28.1380", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "11425", 
      "population_proper": "11425"
    }, 
    {
      "city": "Vaal Reefs", 
      "lat": "-26.9290", 
      "lng": "26.7360", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "11345", 
      "population_proper": "11345"
    }, 
    {
      "city": "De Doorns", 
      "lat": "-33.4833", 
      "lng": "19.6833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "11278", 
      "population_proper": "11278"
    }, 
    {
      "city": "Bhisho", 
      "lat": "-32.8494", 
      "lng": "27.4381", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "admin", 
      "population": "11192", 
      "population_proper": "11192"
    }, 
    {
      "city": "Langeloop", 
      "lat": "-25.6840", 
      "lng": "31.6350", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "11122", 
      "population_proper": "11122"
    }, 
    {
      "city": "Ekuvukeni", 
      "lat": "-28.4660", 
      "lng": "30.1570", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "11018", 
      "population_proper": "11018"
    }, 
    {
      "city": "Velddrif", 
      "lat": "-32.7833", 
      "lng": "18.1667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "11017", 
      "population_proper": "11017"
    }, 
    {
      "city": "Hartswater", 
      "lat": "-27.7667", 
      "lng": "24.8167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Northern Cape", 
      "capital": "", 
      "population": "10465", 
      "population_proper": "10465"
    }, 
    {
      "city": "Alexandria", 
      "lat": "-33.6533", 
      "lng": "26.4083", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "10085", 
      "population_proper": "10085"
    }, 
    {
      "city": "Ga-Kgapane", 
      "lat": "-23.6490", 
      "lng": "30.2260", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "9879", 
      "population_proper": "9879"
    }, 
    {
      "city": "Boekenhouthoek", 
      "lat": "-25.3030", 
      "lng": "29.0150", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "9166", 
      "population_proper": "9166"
    }, 
    {
      "city": "Steynsrus", 
      "lat": "-27.9500", 
      "lng": "27.5667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "9106", 
      "population_proper": "9106"
    }, 
    {
      "city": "Greytown", 
      "lat": "-29.0667", 
      "lng": "30.5833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "9090", 
      "population_proper": "9090"
    }, 
    {
      "city": "Mbuzini", 
      "lat": "-25.9333", 
      "lng": "31.9333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "9070", 
      "population_proper": "9070"
    }, 
    {
      "city": "Doornkop", 
      "lat": "-26.2328", 
      "lng": "27.7833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "8740", 
      "population_proper": "8740"
    }, 
    {
      "city": "Umzimkulu", 
      "lat": "-30.2630", 
      "lng": "29.9400", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "8399", 
      "population_proper": "8399"
    }, 
    {
      "city": "Sedgefield", 
      "lat": "-34.0214", 
      "lng": "22.8033", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "8286", 
      "population_proper": "8286"
    }, 
    {
      "city": "Hawston", 
      "lat": "-34.3833", 
      "lng": "19.1333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "8214", 
      "population_proper": "8214"
    }, 
    {
      "city": "Buffelspruit", 
      "lat": "-25.6580", 
      "lng": "31.5160", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "8202", 
      "population_proper": "8202"
    }, 
    {
      "city": "Lorraine", 
      "lat": "-33.9725", 
      "lng": "25.4981", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "8004", 
      "population_proper": "8004"
    }, 
    {
      "city": "Saron", 
      "lat": "-33.1810", 
      "lng": "19.0100", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "7843", 
      "population_proper": "7843"
    }, 
    {
      "city": "Bosfontein", 
      "lat": "-25.7440", 
      "lng": "31.6260", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "7811", 
      "population_proper": "7811"
    }, 
    {
      "city": "Breidbach", 
      "lat": "-32.8833", 
      "lng": "27.4333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "7767", 
      "population_proper": "7767"
    }, 
    {
      "city": "Welverdiend", 
      "lat": "-24.5810", 
      "lng": "31.3430", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "7601", 
      "population_proper": "7601"
    }, 
    {
      "city": "Wolwekraal", 
      "lat": "-25.1530", 
      "lng": "28.9610", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "7426", 
      "population_proper": "7426"
    }, 
    {
      "city": "Citrusdal", 
      "lat": "-32.5894", 
      "lng": "19.0147", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "7177", 
      "population_proper": "7177"
    }, 
    {
      "city": "Tweeling", 
      "lat": "-27.5500", 
      "lng": "28.5167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Free State", 
      "capital": "", 
      "population": "6465", 
      "population_proper": "6465"
    }, 
    {
      "city": "Vanrhynsdorp", 
      "lat": "-31.6167", 
      "lng": "18.7333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "6272", 
      "population_proper": "6272"
    }, 
    {
      "city": "Klawer", 
      "lat": "-31.7833", 
      "lng": "18.6167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "6234", 
      "population_proper": "6234"
    }, 
    {
      "city": "Elsburg", 
      "lat": "-26.2450", 
      "lng": "28.1970", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "6231", 
      "population_proper": "6231"
    }, 
    {
      "city": "Olifantshoek", 
      "lat": "-23.3400", 
      "lng": "30.2770", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "5976", 
      "population_proper": "5976"
    }, 
    {
      "city": "Genadendal", 
      "lat": "-34.0333", 
      "lng": "19.5500", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "5663", 
      "population_proper": "5663"
    }, 
    {
      "city": "eManguzi", 
      "lat": "-26.9960", 
      "lng": "32.7520", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "5534", 
      "population_proper": "5534"
    }, 
    {
      "city": "Botrivier", 
      "lat": "-34.2258", 
      "lng": "19.2050", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "5505", 
      "population_proper": "5505"
    }, 
    {
      "city": "Oberholzer", 
      "lat": "-26.3470", 
      "lng": "27.3820", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "5397", 
      "population_proper": "5397"
    }, 
    {
      "city": "Mount Ayliff", 
      "lat": "-30.8092", 
      "lng": "29.3669", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "5367", 
      "population_proper": "5367"
    }, 
    {
      "city": "Mount Frere", 
      "lat": "-30.9167", 
      "lng": "28.9833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "5252", 
      "population_proper": "5252"
    }, 
    {
      "city": "Riviersonderend", 
      "lat": "-34.1503", 
      "lng": "19.9144", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "5245", 
      "population_proper": "5245"
    }, 
    {
      "city": "Kenton on Sea", 
      "lat": "-33.6830", 
      "lng": "26.6590", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "5154", 
      "population_proper": "5154"
    }, 
    {
      "city": "Flagstaff", 
      "lat": "-31.0800", 
      "lng": "29.5044", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "4821", 
      "population_proper": "4821"
    }, 
    {
      "city": "Waterkloof", 
      "lat": "-25.7750", 
      "lng": "28.2417", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "4820", 
      "population_proper": "4820"
    }, 
    {
      "city": "Sonop", 
      "lat": "-25.6480", 
      "lng": "27.6980", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "4659", 
      "population_proper": "4659"
    }, 
    {
      "city": "Libode", 
      "lat": "-31.5333", 
      "lng": "29.0167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "4560", 
      "population_proper": "4560"
    }, 
    {
      "city": "Bluewater Bay", 
      "lat": "-33.8567", 
      "lng": "25.6294", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "4530", 
      "population_proper": "4530"
    }, 
    {
      "city": "Riebeek-Wes", 
      "lat": "-33.3505", 
      "lng": "18.8674", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "4350", 
      "population_proper": "4350"
    }, 
    {
      "city": "Sibasa", 
      "lat": "-22.9320", 
      "lng": "30.4670", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "4314", 
      "population_proper": "4314"
    }, 
    {
      "city": "Uvongo Beach", 
      "lat": "-30.8167", 
      "lng": "30.3833", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "4288", 
      "population_proper": "4288"
    }, 
    {
      "city": "Sandbaai", 
      "lat": "-34.4190", 
      "lng": "19.1940", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "4102", 
      "population_proper": "4102"
    }, 
    {
      "city": "Lusikisiki", 
      "lat": "-31.3680", 
      "lng": "29.5760", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "4028", 
      "population_proper": "4028"
    }, 
    {
      "city": "Chrissiesmeer", 
      "lat": "-26.2780", 
      "lng": "30.2130", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "4012", 
      "population_proper": "4012"
    }, 
    {
      "city": "Schulzendal", 
      "lat": "-25.7490", 
      "lng": "31.5400", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "3659", 
      "population_proper": "3659"
    }, 
    {
      "city": "Rooiboklaagte", 
      "lat": "-24.6550", 
      "lng": "31.0670", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "3650", 
      "population_proper": "3650"
    }, 
    {
      "city": "Madikwe", 
      "lat": "-25.3550", 
      "lng": "26.5300", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "3623", 
      "population_proper": "3623"
    }, 
    {
      "city": "Malelane", 
      "lat": "-25.4833", 
      "lng": "31.5167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "3486", 
      "population_proper": "3486"
    }, 
    {
      "city": "Warner Beach", 
      "lat": "-30.0850", 
      "lng": "30.8620", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "3453", 
      "population_proper": "3453"
    }, 
    {
      "city": "Richmond", 
      "lat": "-29.8667", 
      "lng": "30.2667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "3349", 
      "population_proper": "3349"
    }, 
    {
      "city": "Shakaskraal", 
      "lat": "-29.4500", 
      "lng": "31.2167", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "3296", 
      "population_proper": "3296"
    }, 
    {
      "city": "New Hanover", 
      "lat": "-29.3500", 
      "lng": "30.5333", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "3175", 
      "population_proper": "3175"
    }, 
    {
      "city": "Komaggas", 
      "lat": "-29.8000", 
      "lng": "17.5000", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Northern Cape", 
      "capital": "", 
      "population": "3116", 
      "population_proper": "3116"
    }, 
    {
      "city": "Rawsonville", 
      "lat": "-33.6847", 
      "lng": "19.3150", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Western Cape", 
      "capital": "", 
      "population": "3099", 
      "population_proper": "3099"
    }, 
    {
      "city": "Gannalaagte", 
      "lat": "-26.4640", 
      "lng": "25.5300", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "North West", 
      "capital": "", 
      "population": "2830", 
      "population_proper": "2830"
    }, 
    {
      "city": "Fontainebleau", 
      "lat": "-26.1037", 
      "lng": "27.9766", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Gauteng", 
      "capital": "", 
      "population": "2826", 
      "population_proper": "2826"
    }, 
    {
      "city": "Sheepmoor", 
      "lat": "-26.7186", 
      "lng": "30.2989", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "2727", 
      "population_proper": "2727"
    }, 
    {
      "city": "Lesseyton", 
      "lat": "-31.8330", 
      "lng": "26.7660", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "2715", 
      "population_proper": "2715"
    }, 
    {
      "city": "Ngqeleni", 
      "lat": "-31.6700", 
      "lng": "29.0280", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Eastern Cape", 
      "capital": "", 
      "population": "2629", 
      "population_proper": "2629"
    }, 
    {
      "city": "Roossenekal", 
      "lat": "-25.1950", 
      "lng": "29.9250", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "", 
      "population": "2625", 
      "population_proper": "2625"
    }, 
    {
      "city": "Doonside", 
      "lat": "-30.0700", 
      "lng": "30.8710", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "2596", 
      "population_proper": "2596"
    }, 
    {
      "city": "Abbotspoort", 
      "lat": "-23.4530", 
      "lng": "28.0930", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Limpopo", 
      "capital": "", 
      "population": "2489", 
      "population_proper": "2489"
    }, 
    {
      "city": "Hlabisa", 
      "lat": "-28.1333", 
      "lng": "31.8667", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "KwaZulu-Natal", 
      "capital": "", 
      "population": "2469", 
      "population_proper": "2469"
    }, 
    {
      "city": "Nelspruit", 
      "lat": "-25.4745", 
      "lng": "30.9703", 
      "country": "South Africa", 
      "iso2": "ZA", 
      "admin_name": "Mpumalanga", 
      "capital": "admin", 
      "population": "", 
      "population_proper": ""
    }
  ];

  const layers = [
    new HeatmapLayer({
      id: 'heatmapLayer',
      data,
      getPosition: (d) => {
        return [parseFloat(d.lng), parseFloat(d.lat)];
      },
      getWeight: d => parseInt(d.population),
    }),
  ];

  const customMapStyle = {
    version: 8,
    sources: {
      // Define your sources here
    },
    layers: [
      // Define your layers here
    ],
    layout: {
      'attribution-control': {
        display: 'none'
      },
      'logo-control': {
        display: 'none'
      }
    },
    paint: {
      // Paint properties
    }
  };

  return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar data={data} isOpen={isSidebarOpen} />
        <button
            className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
            style={{left: isSidebarOpen ? '320px' : '1px'}} // Dynamically adjust based on isSidebarOpen
        >
          <div className="icon"></div>
        </button>
        <div style={{flex: 1, position: 'relative'}}>
          <DeckGL initialViewState={viewState} controller={true} layers={layers}>
            <Map
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
            />
          </DeckGL>
        </div>
      </div>
  );
}

export default App;