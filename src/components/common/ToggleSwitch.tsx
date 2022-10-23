import styled from "styled-components";

const titleCase = (str: string) =>
  str
    .split(/\s+/)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

interface ClickableLabelProps {
  title: string;
  onChange: (title: string) => void;
}
const ClickableLabel = ({ title, onChange }: ClickableLabelProps) => (
  <SwitchLabel onClick={() => onChange(title)}>{titleCase(title)}</SwitchLabel>
);

interface ConcealedRadioProps {
  value: string;
  selected: string;
}
const ConcealedRadio = ({ value, selected }: ConcealedRadioProps) => (
  <SwitchRadio type="radio" name="switch" checked={selected === value} />
);

interface ToggleSwitchProps {
  values: string[];
  selected: string;
  onChange?: (value: string) => void;
}
const ToggleSwitch = (props: ToggleSwitchProps) => {
  const handleChange = (val: string) => {
    props.onChange && props.onChange(val);
  };

  const selectionStyle = () => {
    return {
      left: `${(props.values.indexOf(props.selected) / 3) * 100}%`,
    };
  };

  return (
    <Switch>
      {props.values.map((val) => {
        return (
          <span>
            <ConcealedRadio value={val} selected={props.selected} />
            <ClickableLabel title={val} onChange={handleChange} />
          </span>
        );
      })}
      <SwitchSelection style={selectionStyle()} />
    </Switch>
  );
};
export default ToggleSwitch;

const Switch = styled.div`
  position: relative;
  height: 26px;
  width: 135px;
  background-color: #f4f4f4;
  border-radius: 3px;
`;

const SwitchRadio = styled.input`
  display: none;
`;

const SwitchSelection = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 45px;
  height: 26px;
  border-color: #216ba5;
  border-width: 1px;
  border-radius: 3px;
  transition: left 0.25s ease-out;
`;

const SwitchLabel = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: 45px;
  line-height: 26px;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  cursor: pointer;

  ${SwitchRadio}:checked + & {
    transition: 0.15s ease-out;
  }
`;
