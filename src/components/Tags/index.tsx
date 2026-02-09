interface TagsProps extends BaseProps {
  label: string; // Label for the tag input
  placeholder: string; // Placeholder for the input field
  label_color: string; // Color of the label
  tagsBgColor: string;
  tagsFontColor: string;
  crossColor: string;
  margin: string;
  value: string[];
  labelAlignment:
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";
  textAlignment:
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";
}

const Configuration={
  grid: {
    desktop: {
      width: 5, // Override width for desktop
      height: 7, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 10, // Keep the same or adjust for mobile
      height: 10, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true
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
        label: "placeholder",
        name: "placeholder",
        type: ElementTypes.TEXT("Add a tag..."),
        width: 24
      },
    ]
  },
  {
    type: ElementTypes.GROUP("data"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Tags",
        name: "value",
        type: ElementTypes.TEXT(),
        showLabel: true,
        width: 24,
        showFx: true,
        onlyFx: true,
        fx: '["tag1", "tag2", "tag3"]'
      }
    ]
  },
  {
    type: ElementTypes.GROUP("style"),
    width: 24,
    collaseOpen: true,
    elements: [
      {
        label: "Label Color",
        name: "label_color",
        type: ElementTypes.COLOR("#000000"),
        showLabel: true,
        width: 24
      },
      {
        label: "Tags Font Color",
        name: "tagsFontColor",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24
      },
      {
        label: "Tags Background Color",
        name: "tagsBgColor",
        type: ElementTypes.COLOR("#1677FF"),
        showLabel: true,
        width: 24
      },
      {
        label: "Cross Color",
        name: "crossColor",
        type: ElementTypes.COLOR("#ffffff"),
        showLabel: true,
        width: 24
      },
      {
        label: "Text Alignment",
        name: "textAlignment",
        type: ElementTypes.TEXTALIGNMENT('left'),
        showLabel: true,
        width: 24
      },
      {
        label: "Label Alignment",
        name: "labelAlignment",
        type: ElementTypes.TEXTALIGNMENT('left'),
        showLabel: true,
        width: 24
      },
      {
        label: "Margin",
        name: "margin",
        type: ElementTypes.SPACING(['0px', '0px', '0px', '0px']),
        showLabel: true,
        width: 24
      },
    ]
  },
];

const getThemeMapping = (THEME: any) => ({});
export const getTagsManifest = (api: any) => {
    const { ElementTypes, THEME, getDefaultProps } = api;
    const EditProperties = getEditProperties(ElementTypes,  THEME);
    
    return {
        name: "RangePicker",
        EditProperties: EditProperties,
        Configuration: Configuration,
        ThemeMapping: getThemeMapping(THEME),
        defaultProps: getDefaultProps(EditProperties),
    };
};

export function createComponent(api: any) {
  const { ElementTypes,BaseComponent, THEME, getDefaultProps, React } = api;
  const {useState, useEffect } = React;
  const EditProperties = getEditProperties(ElementTypes, THEME);

  const defaultProps: Partial<TagsProps> = getDefaultProps(EditProperties);

  const Tags: React.FC<TagsProps> & { PropsList?: string[], EditProperties?: {},Configuration?: {} } = (props) => {
    const {id,_name, grid, properties = {}, updateProperties, onFxChange, ...rest } = props;
    const {  label, value, placeholder, margin = ['0px', '0px', '0px', '0px'], label_color, labelAlignment, textAlignment, tagsBgColor, tagsFontColor, crossColor} = { ...defaultProps, ...properties } as Required<TagsProps>;
    const [tagstates, setTagStates] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      if (value && Array.isArray(value)) {
        setTagStates(value);
      }
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (e.target.value) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    const handleAddTag = (tag: string) => {
      if (tag && !tagstates.includes(tag) && id && updateProperties) {
        setTagStates([...tagstates, tag]);
        updateProperties(id, "value", tagstates);
        setInputValue('');
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAddTag(inputValue.trim());
      }
    };

    const handleRemoveTag = (tag: string) => {
      setTagStates(tagstates.filter((t: string) => t !== tag));
    };

    const baseCmpProps = {
      id: id || '',
      properties,
      EditProperties,
      updateProperties,
      grid: grid || Configuration.grid
    };

    return (
      <BaseComponent {...baseCmpProps} style={{padding:'4px', height: `calc(100% - (${margin[0]} + ${margin[2]}))`, width: `calc(100% - (${margin[1]} + ${margin[3]})) ` }}>
        <div style={{ margin: `${margin[0]} ${margin[1]} ${margin[2]} ${margin[3]}`, textAlign: labelAlignment }}>
          <label style={{ color: label_color, fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{label}</label>
          <div className='text-xs' style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
            {tagstates.map((tag: string, index: number) => (
              <span key={index} style={{ backgroundColor: tagsBgColor, color: tagsFontColor, borderRadius: '15px', padding: '5px 10px', marginRight: '5px', display: 'flex', alignItems: 'center' }}>
                {tag}
                <button onClick={() => handleRemoveTag(tag)} style={{ background: 'none', border: 'none', color: crossColor, marginLeft: '5px', cursor: 'pointer' }}>×</button>
              </span>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              style={{
                flexGrow: 1,
                border: 'none',
                outline: 'none',
                padding: '10px',
                fontSize: '12px',
                textAlign: textAlignment
              }}
            />
          </div>
        </div>
      </BaseComponent>
    );
  };
  return {
    component: Tags,
    manifest: getTagsManifest(api),
  }
}
export default {
  createComponent,
};
