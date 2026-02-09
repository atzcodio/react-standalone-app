

interface RatingProps {
  value?: number; // Initial rating value (1 to 5)
  maxRating?: number; // Maximum rating value (default is 5)
  fontSize?: number; // Optional font size for stars
  color?: string; // Optional color for stars
  fontWeight?: "normal" | "bold" | "bolder" | "lighter"; // Optional font weight for the label
  aligment:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  margin: string;
  padding: string;
  borderRadius: string;
  iconType: "star" | "heart" | "diamond" | "coffee" | "bulb" | "sunglasses" | "thumbs-up"; // Choose the type of icon (star or heart)
}

const Configuration = {
  grid: {
    desktop: {
      width: 5, // Override width for desktop
      height: 5, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 8, // Keep the same or adjust for mobile
      height: 4, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true
  }
}

const getThemeMapping = (THEME: any) => {
  return {
  }
}

const getEditProperties = (ElementTypes: any, THEME: any) => [
  {
      type: ElementTypes.GROUP("basic"),
      width: 24,
      collaseOpen: true,
      elements: [
          {
              label: "Name",
              name: "_name",
              type: ElementTypes.TEXT(""),
              showLabel: true,
              width: 24
          },
          {
              label: "value",
              name: "value",
              type: ElementTypes.NUMBER(3),
              showLabel: true,
              width: 24
          },
          {
              label: "maxRating",
              name: "maxRating",
              type: ElementTypes.NUMBER(5),
              showLabel: true,
              width: 24
          },
          {
              label: "iconType",
              name: "iconType",
              type: ElementTypes.SELECT(["star", "heart", "diamond", "coffee", "bulb", "sunglasses", "thumbs-up"], 'star'),
              showLabel: true,
              width: 24
          },
      ]
  },
  {
      type: ElementTypes.GROUP("style"),
      width: 24,
      collaseOpen: true,
      elements: [
          {
              label: "color",
              name: "color",
              type: ElementTypes.COLOR("#f5222d"),
              showLabel: true,
              width: 24
          },
          {
              label: "aligment",
              name: "aligment",
              type: ElementTypes.TEXTALIGNMENT('center'),
              showLabel: true,
              width: 24
          },
          {
              label: "fontSize",
              name: "fontSize",
              type: ElementTypes.TEXT('30px'),
              showLabel: true,
              width: 24
          },
          {
            label: "Border Radius",
            name: "borderRadius",
            type: ElementTypes.BORDERRADIUS(["4px", "4px", "4px", "4px"]),
            showLabel: true,
            width: 24
          },
          {
            label: "Padding",
            name: "padding",
            type: ElementTypes.SPACING(['4px', '4px', '4px', '4px']),
            showLabel: true,
            width: 24
          },
          {
            label: "Margin",
            name: "margin",
            type: ElementTypes.SPACING(['2px', '2px', '2px', '2px']),
            showLabel: true,
            width: 24
          },
      ]
  },
];

export const getRatingManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    return {
        name: "Rating",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

export function createComponent(api: any) {
  try {

    const { BaseComponent,ElementTypes, THEME, getDefaultProps, AiIcons, RiIcons, BsIcons, HiIcons, PiIcons } = api;
    const EditProperties = getEditProperties(ElementTypes, THEME);
    const {useState, useEffect } = api.React;
    const {RiVipDiamondFill , RiVipDiamondLine } = RiIcons;
    const {BsEmojiSunglasses, BsFillEmojiSunglassesFill  } = BsIcons;
    const {HiOutlineHandThumbUp, HiHandThumbUp } = HiIcons;
    const {PiCoffeeFill ,PiCoffeeLight } = PiIcons;
    const {AiFillHeart, AiOutlineHeart,AiFillBulb, AiTwotoneBulb,AiFillStar, AiOutlineStar} = AiIcons;

    const defaultProps: Partial<RatingProps> = getDefaultProps(EditProperties);

    const Rating: React.FC<RatingProps & BaseProps>  = (props) => {
      const {id,_name, grid, properties, meta, updateProperties, onFxChange, ...rest } = props;

      const {
        fontSize,
        aligment,
        padding,
        margin,
        borderRadius,
        color,
        value = 3, // default value if not provided
        maxRating = 5, // default maximum rating
        fontWeight = 'normal',
        iconType = "star", // default to "star"
      } = {...defaultProps, ...properties } as Required<RatingProps>;

      const [rating, setRating] = useState(value);

      let flexAlignment = "center";
      const alignmentMap = {
        "start": "flex-start",
        "end": "flex-end",
        "left": "flex-start",
        "right": "flex-end",
        "center": "center",
        "justify": "space-between",
        "match-parent": "stretch"
      }
      flexAlignment =  alignmentMap[aligment] || "center";
    
      const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        updateProperties(id, 'value', newRating); // Optional: Update parent component or context
      };

      useEffect(() => {
        if (typeof value === 'number' && value !== rating) {
          setRating(value);
        }
      }, [value]);

      const baseCmpProps = {
        id,
        properties,
        meta,
        EditProperties,
        updateProperties,
        grid,
      };
      const iconMap = {
        "diamond": [RiVipDiamondFill, RiVipDiamondLine],
        "heart": [AiFillHeart, AiOutlineHeart],
        "star": [AiFillStar, AiOutlineStar],
        "coffee": [PiCoffeeFill, PiCoffeeLight],
        "bulb": [AiFillBulb, AiTwotoneBulb],
        "sunglasses": [BsFillEmojiSunglassesFill, BsEmojiSunglasses],
        "thumbs-up": [HiHandThumbUp, HiOutlineHandThumbUp],
      }

      const renderIcon = (index: number, isFilled: boolean) => {
        var AiIcon = null;
        AiIcon = iconMap[iconType] && (AiIcon = iconMap[iconType][isFilled ? 0 : 1]);
        return (
            AiIcon && <AiIcon
            key={index}
            onClick={() => handleRatingChange(index + 1)}
            style={{
              cursor: 'pointer',
              fontSize: fontSize,
              color: color,
              transition: 'color 0.2s ease',
            }}
          />
        );
      };

      return (
        <BaseComponent
          {...baseCmpProps}
          style={{
            height: `calc(100% - (${margin[0]} + ${margin[2]}))`,
            width: `calc(100% - (${margin[1]} + ${margin[3]}))`,
          }}
        >
          <span
            style={{
              color: color,
              textAlign: aligment,
              fontWeight: fontWeight,
              fontSize: fontSize,
              padding: `${padding[0]} ${padding[1]} ${padding[2]} ${padding[3]}`,
              width: '100%',
              display: 'flex',
              justifyContent: flexAlignment,
              alignItems: 'center',
              height: '100%',
            }}
          >
            {[...Array(maxRating)].map((_, index) => {
              const isFilled = index < rating;
              return renderIcon(index, isFilled);
            })}
          </span>
        </BaseComponent>
      );
    };
    return {
      component: Rating,
      manifest: getRatingManifest(api),
    }
  
  }
  catch (error) {
    console.error("Error in createComponent for Rating:", error);
    throw error;
  }
}

export default {
  createComponent,
}
