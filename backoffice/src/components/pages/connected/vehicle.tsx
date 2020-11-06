import React from "react";
import { observer } from "mobx-react";

import { classNamesPrefix } from "utils/react";

import { useCallback } from "hooks";

import "./vehicle.scss";

const block = "vehicle";

const cx = classNamesPrefix(block);

type VehicleProps = {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  speed: number;
  temperature: number;
  online: boolean;
  location: number[];
  onClick(location: number[]): void;
};

const Vehicle = observer(
  ({
    name,
    vehicle,
    plate,
    speed,
    temperature,
    online,
    location,
    onClick,
  }: VehicleProps) => {
    const onClickHandler = useCallback(() => onClick(location), [
      onClick,
      location,
    ]);

    return (
      <div className={block} onClick={onClickHandler}>
        <div
          className={cx(
            "__column",
            "__vehicle",
            online ? "__online" : "__offline"
          )}
        >
          <div className={cx("__vehicle-name")}>{name}</div>
          <div className={cx("__vehicle-description")}>
            {vehicle} {plate}
          </div>
          <div
            className={cx("__vehicle-speed_and_temp")}
          >{`${speed} km/h - ${temperature} °C`}</div>
        </div>
      </div>
    );
  }
);

export default Vehicle;
