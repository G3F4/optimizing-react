import React, { useContext } from 'react';
import AppContext from '../../../AppContext';

const Times = () => {
  const { value: { times } } = useContext(AppContext);

  return (
    <div>
      <h3>Update delta:</h3>
      <div className="times">
        {times.map((time, index) => 48 - index * 3 > 0 && (
          <div key={index} style={{ fontSize: 48 - index * 3 }}>{`${time} ms`}</div>
        ))}
      </div>
    </div>
  );
};

export default Times;
