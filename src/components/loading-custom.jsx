import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerScale } from "@fortawesome/pro-regular-svg-icons";


export default function LoadingCustom() {
  return <>
    <div className="load-ui min-h-60 border rounded-xl flex flex-col justify-center text-center mb-10">
      <FontAwesomeIcon icon={faSpinnerScale} className="text-3xl" spinPulse />
      <div className="load-ui__text">Please wait, data is loading...</div>
    </div>
  </>
}