import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import moment from 'moment';
import standings from 'src/app/components/footballScore/standings.json';
import fixture from 'src/app/components/footballScore/fixtures.json';
import { environment } from 'src/environments/environment';

let rapidapi = 'e4107e33e5msh76c70dcc39cafacp14663bjsn1ede35f0193b'



@Component({
  selector: 'app-footballscore',
  templateUrl: './footballscore.component.html',
  styleUrls: ['./footballscore.component.css']
})
export class FootballScoreComponent implements OnInit {
  constructor() {
    this.rank = 0;
    this.date = '';
  }
  away: any;
  home: any;
  rank: number;
  date: string;

  ngOnInit() {

    if (environment.production == false) {
      console.log('production is false, stubbing data')
      this.away = fixture.response[0].teams.away;
      this.home = fixture.response[0].teams.home;
      this.date = moment(fixture.response[0].fixture.date).format('MM/DD/YYYY hh:mm A');
      this.rank = standings.response[0].league.standings[0][0].rank;
    } else {
      console.log('we should not be here')
    axios({
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { season: '2023', team: '16489', timezone: 'America/Chicago', next: '1' },
      headers: {
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        'x-rapidapi-key': rapidapi,
      },
    })
      .then(response => {
        console.log('fixture api:', response.data);
        console.log('fixture api:', response.data.response[0].teams);
        
        this.away = response.data.response[0].teams.away;
        this.home = response.data.response[0].teams.home;

        const rawDate = response.data.response[0].fixture.date;
        this.date = moment(rawDate).format('MM/DD/YYYY hh:mm A');
        console.log('Formatted date:', this.date);
      })
      .catch(error => {
        console.log(error);
      });

    axios({
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
      params: { season: '2023', league: '253', team: '16489' },
      headers: {
        'x-rapidapi-key': rapidapi,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      },
    })
      .then(response => {
        console.log(response.data.response[0].league.standings[0][0].rank);
        this.rank = response.data.response[0].league.standings[0][0].rank;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
}
