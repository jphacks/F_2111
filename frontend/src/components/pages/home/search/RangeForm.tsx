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
      <FormLabel>{name}</FormLabel>
      <RadioGroup onChange={onChange} value={value}>
        {/*<HStack {...group}>*/}
        {
          ranges.map(({id, min, max}) => {
            if (name === 'シャッタースピード') {
              const minLabel = min > -100 ? `${prefix}${getShutterSpeed(min)}${suffix} ` : '';
              const maxLabel = max < 100 ? ` ${prefix}${getShutterSpeed(max)}${suffix}` : '';
              return <Radio key={id} value={id.toString()}>{`${minLabel}〜${maxLabel}`}</Radio>;
            }
            const minLabel = min !== -1 ? `${prefix}${min}${suffix} ` : '';
            const maxLabel = max !== -1 ? ` ${prefix}${max}${suffix}` : '';
            return <Radio key={id} value={id.toString()}>{`${minLabel}〜${maxLabel}`}</Radio>;
          })
        }
        <Radio value=''>指定なし</Radio>
        {/*</HStack>*/}
      </RadioGroup>
    </FormControl>
  );
};
