import { OfferingItemType } from "@/core/types/constants";

interface OfferingItemProps extends Partial<OfferingItemType> {
  id?: number;
  listNumber: number;
}

export default OfferingItemProps;
