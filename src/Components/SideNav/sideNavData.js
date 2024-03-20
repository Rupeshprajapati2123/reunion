import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
const PageIconStyle = {
  fontSize: "20px",
  flexShrink: "0",
  color: "var(--Icon-Color)",
};
const pages = [
  {
    id: 1,
    name: "Home",
    url: "/",
    icon: <HomeOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 2,
    name: "Orders",
    url: "/",
    icon: <InventoryOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 3,
    name: "Products",
    url: "/",
    icon: <GridViewOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 4,
    name: "Delivery",
    url: "/",
    icon: <LocalShippingOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 5,
    name: "Marketing",
    url: "/",
    icon: <CampaignOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 6,
    name: "Analytics",
    url: "/",
    icon: <LeaderboardOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 7,
    name: "Payments",
    url: "/",
    icon: <PaymentsOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 8,
    name: "Tools",
    url: "/",
    icon: <HandymanOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 9,
    name: "Discounts",
    url: "/",
    icon: <LocalOfferOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 10,
    name: "Audience",
    url: "/",
    icon: <PeopleOutlineOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 11,
    name: "Appearance",
    url: "/",
    icon: <PaletteOutlinedIcon sx={PageIconStyle} />,
  },
  {
    id: 12,
    name: "Plugins",
    url: "/",
    icon: <ElectricBoltOutlinedIcon sx={PageIconStyle} />,
  },
];

export default pages;
