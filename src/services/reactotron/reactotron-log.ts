import Reactotron from 'reactotron-react-native';

export function log(...logData: any) {
  if(__DEV__)
  Reactotron.log?.(logData);
  console.log(logData)
}
