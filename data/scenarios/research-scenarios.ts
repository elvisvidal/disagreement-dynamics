import { buildResearchScenario } from './research-scenario-builder'
import { socialMediaModerationScenarioCopy } from './research/social-media-moderation'
import { housingDensityScenarioCopy } from './research/housing-density'
import { immigrationPublicServicesScenarioCopy } from './research/immigration-public-services'
import { climateHouseholdCostsScenarioCopy } from './research/climate-household-costs'
import { policingPublicSafetyScenarioCopy } from './research/policing-public-safety'
import { universitySpeechScenarioCopy } from './research/university-speech'
import { wealthTaxationScenarioCopy } from './research/wealth-taxation'
import { teenDigitalPrivacyScenarioCopy } from './research/teen-digital-privacy'
import { publicMonumentsScenarioCopy } from './research/public-monuments'
import { cashlessBusinessesScenarioCopy } from './research/cashless-businesses'

const copies = [
  socialMediaModerationScenarioCopy,
  housingDensityScenarioCopy,
  immigrationPublicServicesScenarioCopy,
  climateHouseholdCostsScenarioCopy,
  policingPublicSafetyScenarioCopy,
  universitySpeechScenarioCopy,
  wealthTaxationScenarioCopy,
  teenDigitalPrivacyScenarioCopy,
  publicMonumentsScenarioCopy,
  cashlessBusinessesScenarioCopy
]

export const researchScenarios = copies.map(buildResearchScenario)
