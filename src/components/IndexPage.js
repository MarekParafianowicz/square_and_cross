import React from 'react';
import { AthleteCard } from './AthleteCard';
import Game from './Game';

export const IndexPage = ({ athletes }) => (
  <div className="home">
    <div className="athletes-selector">
      <Game />
      {/* {athletes.map(
        athleteData => <AthleteCard key={athleteData.id} {...athleteData} />,
      )} */}
    </div>
  </div>
);

export default IndexPage;
