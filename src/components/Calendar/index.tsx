

interface CalendarProps {
  initialDate?: string | Date;
  selectedDate?: string | Date;
  minDate?: string | Date;
  maxDate?: string | Date;
  showTodayHighlight?: boolean;
  showWeekNumbers?: boolean;
  theme?: string;
  calendar_background?: string;
  calendar_text?: string;
  calendar_border?: string;
  header_background?: string;
  header_text?: string;
  selected_day_background?: string;
  selected_day_text?: string;
  today_background?: string;
  today_text?: string;
  disabled_day_text?: string;
  week_number_background?: string;
  week_number_text?: string;
  onDateChange?: (date: Date) => void;
}

const getEditProperties = (ElementTypes: any) => [
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
        width: 24,
      },
      {
        label: "Initial Date",
        name: "initialDate",
        type: ElementTypes.TEXT(new Date().toISOString().split("T")[0]),
        width: 24,
      },
      {
        label: "Selected Date",
        name: "selectedDate",
        type: ElementTypes.TEXT(new Date().toISOString().split("T")[0]),
        width: 24,
      },
      {
        label: "Min Date",
        name: "minDate",
        type: ElementTypes.TEXT(""),
        width: 12,
      },
      {
        label: "Max Date",
        name: "maxDate",
        type: ElementTypes.TEXT(""),
        width: 12,
      },
      {
        label: "Highlight Today",
        name: "showTodayHighlight",
        type: ElementTypes.TOGGLE(true),
        width: 12,
      },
      {
        label: "Show Week Numbers",
        name: "showWeekNumbers",
        type: ElementTypes.TOGGLE(false),
        width: 12,
      },
      {
        label: "Theme",
        name: "theme",
        type: ElementTypes.CHANGETHEME(),
        width: 24,
      },
      {
        label: "Calendar Background",
        name: "calendar_background",
        type: ElementTypes.COLOR(""),
        width: 24,
      },
      {
        label: "Calendar Text Color",
        name: "calendar_text",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Calendar Border Color",
        name: "calendar_border",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Header Background",
        name: "header_background",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Header Text Color",
        name: "header_text",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Selected Day Background",
        name: "selected_day_background",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Selected Day Text Color",
        name: "selected_day_text",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Today Background",
        name: "today_background",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Today Text Color",
        name: "today_text",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Disabled Day Text Color",
        name: "disabled_day_text",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Week Number Background",
        name: "week_number_background",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
      {
        label: "Week Number Text Color",
        name: "week_number_text",
        type: ElementTypes.COLOR(""),
        width: 12,
      },
    ],
  },
];

/* export const THEME={
  backgroundColor:'backgroundColor',
  textColor:'textColor',
  borderColor:'borderColor',
  primaryColor: 'primaryColor',
  secondaryColor: 'secondaryColor',
  accentColor: 'accentColor',
  surfaceColor: 'surfaceColor',
  errorColor: 'errorColor',
  warningColor: 'warningColor',
  successColor: 'successColor',
  infoColor: 'infoColor',
  mutedTextColor: 'mutedTextColor',
  linkColor: 'linkColor',
  hoverColor: 'hoverColor',
  focusColor: 'focusColor',
  shadowColor: 'shadowColor'
}
  */


const getThemeMapping = (THEME: any) => {
  return {
    calendar_background: THEME.backgroundColor,
    calendar_text: THEME.textColor,
    calendar_border: THEME.borderColor,
    header_background: THEME.primaryColor,
    header_text: THEME.textColor,
    selected_day_background: THEME.accentColor,
    selected_day_text: THEME.surfaceColor,
    today_background: THEME.successColor,
    today_text: THEME.textColor,
    disabled_day_text: THEME.mutedTextColor,
    week_number_background: THEME.surfaceColor,
    week_number_text: THEME.textColor,
  };
};

export function getCalenderManifest(api: any) {
  const { ElementTypes, THEME, getDefaultProps } = api;
  const defaultProps = getDefaultProps(getEditProperties(ElementTypes));
  return {
    name: "Button",
    EditProperties: getEditProperties(ElementTypes),
    Configuration,
    ThemeMapping: getThemeMapping(THEME),
    defaultProps,
  };
}

const Configuration = {
  grid: {
    desktop: {
      width: 12, // Override width for desktop
      height: 30, // Keep height the same or adjust as needed
    },
    mobile: {
      width: 24, // Keep the same or adjust for mobile
      height: 30, // Keep the same or adjust as needed
    },
  },
  resizable: {
    width: true,
    height: true,
  },
};

export function createComponent(api: any) {
  try {
    const { ElementTypes, THEME,BaseProps, BaseComponent, getDefaultProps, React } = api;
    const EditProperties = getEditProperties(ElementTypes);
    const {useState} = React;

    const defaultProps: Partial<CalendarProps> = getDefaultProps(
      getEditProperties(ElementTypes)
    );

    const Calendar: React.FC<CalendarProps & BaseProps> & {
      EditProperties?: {};
    } = (props) => {
      const {
        id,
        grid,
        properties,
        meta,
        updateProperties,
        onFxChange,
        ...rest
      } = props;
      const {
        initialDate = new Date(),
        selectedDate,
        minDate,
        maxDate,
        showTodayHighlight = true,
        showWeekNumbers = false,
        theme = "default",
        calendar_background = "",
        calendar_text = "",
        calendar_border = "",
        header_background = "",
        header_text = "",
        selected_day_background = "",
        selected_day_text = "",
        today_background = "",
        today_text = "",
        disabled_day_text = "",
        week_number_background = "",
        week_number_text = "",
        onDateChange,
      } = {
        ...defaultProps,
        ...properties,
      } as Required<CalendarProps>;

      // Parse dates
      const parseDate = (d: string | Date | undefined) => {
        if (!d) return undefined;
        if (typeof d === "string") return new Date(d);
        return d;
      };
      const today = new Date();
      const _selectedDate = parseDate(selectedDate);
      const _minDate = parseDate(minDate);
      const _maxDate = parseDate(maxDate);
      const _initialDate = parseDate(initialDate) || today;
      const [currentDate, setCurrentDate] = useState(_initialDate);

      const isSameDay = (d1: Date, d2: Date) =>
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

      const isOutOfRange = (date: Date) => {
        if (_minDate && date < _minDate) return true;
        if (_maxDate && date > _maxDate) return true;
        return false;
      };

      const changeMonth = (delta: number) => {
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + delta,
          1
        );
        setCurrentDate(newDate);
      };

      const handleDayClick = (date: Date) => {
        if (isOutOfRange(date)) return;
        if (onDateChange) onDateChange(date);
        if (updateProperties) updateProperties(id, "selectedDate", date);
      };

      const baseCmpProps = {
        id,
        properties,
        meta,
        EditProperties,
        updateProperties,
        grid,
      };

      // Get theme mapping for all theme properties
      const themeMapping = getThemeMapping(THEME);
      const calendarBg = calendar_background;
      const calendarText = calendar_text;
      const calendarBorder = calendar_border;
      const headerBg = header_background;
      const headerText = header_text;
      const selectedDayBg = selected_day_background;
      const selectedDayText = selected_day_text;
      const todayBg = today_background;
      const todayText = today_text;
      const disabledDayText = disabled_day_text;
      const weekNumberBg = week_number_background;
      const weekNumberText = week_number_text;

      // Updated renderHeader to use headerBg and headerText
      const renderHeader = () => {
        const month = currentDate.toLocaleString("default", { month: "long" });
        const year = currentDate.getFullYear();
        return (
          <div style={{ ...styles.header, backgroundColor: headerBg, color: headerText }}>
            <button style={styles.navBtn} onClick={() => changeMonth(-1)}>Prev</button>
            <span style={styles.headerTitle}>{`${month} ${year}`}</span>
            <button style={styles.navBtn} onClick={() => changeMonth(1)}>Next</button>
          </div>
        );
      };

      // Updated renderDaysOfWeek to use weekNumberBg and weekNumberText
      const renderDaysOfWeek = () => {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
          <div style={styles.row}>
            {showWeekNumbers && <div style={{ ...styles.weekNumberCell, background: weekNumberBg, color: weekNumberText }}>#</div>}
            {daysOfWeek.map((day) => (
              <div key={day} style={styles.dayOfWeek}>
                {day}
              </div>
            ))}
          </div>
        );
      };

      // Updated renderDays to use selected/today/disabled colors
      const renderDays = () => {
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        const days = [];
        let week = [];
        let weekNumber = 1;

        // Fill in blank spaces for the first week
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
          week.push(<div key={`blank-${i}`} style={styles.day} />);
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isToday = showTodayHighlight && isSameDay(date, today);
          const isSelected = _selectedDate && isSameDay(date, _selectedDate);
          const outOfRange = isOutOfRange(date);
          week.push(
            <div
              key={day}
              style={{
                ...styles.day,
                ...(isToday ? { background: todayBg, color: todayText } : {}),
                ...(isSelected ? { background: selectedDayBg, color: selectedDayText } : {}),
                ...(outOfRange ? { color: disabledDayText } : {}),
                cursor: outOfRange ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
              onClick={() => handleDayClick(date)}
              tabIndex={outOfRange ? -1 : 0}
              aria-disabled={outOfRange}
            >
              {day}
            </div>
          );
          if ((week.length === 7 && showWeekNumbers) || (week.length === 7 && !showWeekNumbers) || day === lastDayOfMonth.getDate()) {
            // Add week number if enabled
            days.push(
              <div style={styles.row} key={`week-${weekNumber}`}>
                {showWeekNumbers && <div style={{ ...styles.weekNumberCell, background: weekNumberBg, color: weekNumberText }}>{weekNumber}</div>}
                {week}
              </div>
            );
            week = [];
            weekNumber++;
          }
        }
        // Fill last week with blanks if needed
        if (week.length > 0 && week.length < 7) {
          while (week.length < 7) {
            week.push(<div key={`blank-end-${week.length}`} style={styles.day} />);
          }
          days.push(
            <div style={styles.row} key={`week-last`}>
              {showWeekNumbers && <div style={{ ...styles.weekNumberCell, background: weekNumberBg, color: weekNumberText }}>{weekNumber}</div>}
              {week}
            </div>
          );
        }
        return <>{days}</>;
      };

      return (
        <BaseComponent {...baseCmpProps}>
          <div style={{ ...styles.calendar, background: calendarBg, color: calendarText, border: calendarBorder }}>
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderDays()}
          </div>
        </BaseComponent>
      );
    };

    const styles: { [key: string]: React.CSSProperties } = {
      calendar: {
        width: "100%",
        maxWidth: 340,
        border: "1px solid #ccc",
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "Inter, Arial, sans-serif",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        margin: "0 auto",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: "#f7f7f7",
        borderBottom: "1px solid #eee",
      },
      headerTitle: {
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: 1,
      },
      navBtn: {
        background: "none",
        border: "none",
        fontSize: 18,
        cursor: "pointer",
        padding: 4,
        color: "#888",
        borderRadius: 4,
        transition: "background 0.2s, color 0.2s",
      },
      row: {
        display: "flex",
        width: "100%",
      },
      dayOfWeek: {
        flex: 1,
        padding: "8px 0",
        textAlign: "center",
        fontWeight: 500,
        color: "#888",
        background: "#fafafa",
        borderBottom: "1px solid #eee",
        fontSize: 14,
      },
      day: {
        flex: 1,
        padding: "10px 0",
        textAlign: "center",
        border: "1px solid #f0f0f0",
        minHeight: 40,
        boxSizing: "border-box",
        fontSize: 15,
        background: "#fff",
        transition: "background 0.2s, color 0.2s",
        userSelect: "none",
      },
      today: {
        background: "#e0f7fa",
        color: "#00796b",
        fontWeight: 700,
        borderRadius: 8,
      },
      selected: {
        background: "#1976d2",
        color: "#fff",
        fontWeight: 700,
        borderRadius: 8,
      },
      disabled: {
        color: "#ccc",
        background: "#fafafa",
        pointerEvents: "none",
        textDecoration: "line-through",
      },
      weekNumberCell: {
        width: 32,
        minWidth: 32,
        maxWidth: 32,
        textAlign: "center",
        color: "#bbb",
        fontWeight: 400,
        background: "#f9f9f9",
        borderRight: "1px solid #eee",
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    };

    // Example theme styles (expand as needed)
    const themeStyles: { [key: string]: Partial<typeof styles> } = {
      primary: {
        calendar: { border: "1px solid #1976d2" },
        header: { backgroundColor: "#1976d2", color: "#fff" },
      },
      secondary: {
        calendar: { border: "1px solid #9c27b0" },
        header: { backgroundColor: "#9c27b0", color: "#fff" },
      },
      minimal: {
        calendar: { border: "none", boxShadow: "none" },
        header: { backgroundColor: "#fff", color: "#222" },
      },
      neon: {
        calendar: { border: "2px solid #39ff14", boxShadow: "0 0 8px #39ff14" },
        header: { backgroundColor: "#222", color: "#39ff14" },
      },
      pastel: {
        calendar: { border: "1px solid #ffd6e0", background: "#fff0f6" },
        header: { backgroundColor: "#ffe0f7", color: "#d72660" },
      },
      autumn: {
        calendar: { border: "1px solid #b87333", background: "#fff8f0" },
        header: { backgroundColor: "#b87333", color: "#fff" },
      },
      earth: {
        calendar: { border: "1px solid #8d8741", background: "#f4e2d8" },
        header: { backgroundColor: "#8d8741", color: "#fff" },
      },
      royal: {
        calendar: { border: "1px solid #4169e1", background: "#f0f4ff" },
        header: { backgroundColor: "#4169e1", color: "#fff" },
      },
      grayscale: {
        calendar: { border: "1px solid #bbb", background: "#f7f7f7" },
        header: { backgroundColor: "#bbb", color: "#222" },
      },
    };
    return {
      component: Calendar,
      manifest: getCalenderManifest(api),
    };
  } catch (ex: any) {
    throw new Error("Error in Calendar component creation: " + ex.message);
  }
}

export default {
  createComponent,
};
