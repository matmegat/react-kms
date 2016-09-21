import {mainDomain} from '../config';

export default function getSubDomain(domain) {
  const mainDomainPos = domain.indexOf(mainDomain);
  let subDomain = false;
  if (mainDomainPos > 1) {
    subDomain = domain.substr(0, mainDomainPos - 1);
  }
  return subDomain;
}
