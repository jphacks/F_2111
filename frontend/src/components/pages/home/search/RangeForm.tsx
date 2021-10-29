import {FormControl, FormLabel, Radio, RadioGroup} from '@chakra-ui/react';

import type {FC} from 'react';
import type {RangeCondition} from '../../../../types';
import {getShutterSpeed} from '../../../../utils/getShutterSpeed';

interface Props {
  name: string
  value: string
  rangeCondition: RangeCondition
  onChange: (nextValue: string) => void
}

const Style = {
  Box: { marginTop: '10px', marginBottom: '10px' },
  Box2: {
    marginTop: '10px',
    marginBottom: '10px',
    padding: "10px",
    border: "1px",
    borderColor: "orange",
    borderRadius: "5px",
    background: "white"
  },
  Container: {
    backgroundColor: "rgb(255 199 142 / 70%)",
    backdropFilter: "blur(2px)",
    paddingTop: "20px",
    paddingBottom: "10px"
  },
  Form: {
    paddingBottom: "2px",
    borderBottom: "1px",
    borderBottomWidth: "2px",
    width: "40%",
    borderColor: "orange",
    fontSize: "100%"
  },
  FormInput: {
    focusBorderColor: "Orange",
    borderColor: "orange",
    background: "white"
  },
  FormTextArea: {
    height: "100px",
    focusBorderColor: "Orange",
    borderColor: "orange",
    background: "white"
  },
};

export const RangeForm: FC<Props> = ({name, value, rangeCondition: {prefix, suffix, ranges}, onChange}) => {
  // const {getRootProps, getRadioProps} = useRadioGroup({
  //   name: name,
  //   defaultValue: value,
  //   onChange: onChange,
  // });
  //
  // const group = getRootProps();


  return (
    <FormControl as='fieldset'>
      <FormLabel {...Style.Form}>{name}</FormLabel>
      <RadioGroup display={{base:"grid", sm:"inherit"}} onChange={onChange} value={value}>
        {/*<HStack {...group}>*/}
        {
          ranges.map(({id, min, max}) => {
            if (name === 'シャッタースピード') {
              const minLabel = min > -100 ? `${prefix}${getShutterSpeed(min)}${suffix} ` : '';
              const maxLabel = max < 100 ? ` ${prefix}${getShutterSpeed(max)}${suffix}` : '';
              return <Radio marginRight="5px" key={id} value={id.toString()}>{`${minLabel}〜${maxLabel}`}</Radio>;
            }
            const minLabel = min !== -1 ? `${prefix}${min}${suffix} ` : '';
            const maxLabel = max !== -1 ? ` ${prefix}${max}${suffix}` : '';
            return <Radio marginRight="5px" key={id} value={id.toString()}>{`${minLabel}〜${maxLabel}`}</Radio>;
          })
        }
        <Radio value=''>指定なし</Radio>
        {/*</HStack>*/}
      </RadioGroup>
    </FormControl>
  );
};
