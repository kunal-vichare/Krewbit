import * as React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import StandardLoader, { LOADER_SIZE } from "./StandardLoader";
import { colors } from "../../Helper/colors";
import {
  appLockButton,
  borderValue,
  iconSizes,
  opacityValue,
  pageSizeValue,
  spacing,
} from "../../Helper/sizes";
import IconComponent from "./IconComponent";
import { moderateScale } from "./ResponsiveDesign";
import { fontStyle } from "../../Helper";

const TEXT_INPUT_LEFT_PADDING = 18;
const TEXT_INPUT_CONTACT_PADDING = moderateScale(12);
const TEXT_INPUT_CURRENCY_PADDING = 30;
const TEXT_INPUT_MULTI_CHAR_PREFIX_BASE = moderateScale(14);
const TEXT_INPUT_MULTI_CHAR_PREFIX_PER_CHAR = moderateScale(10);

const CommonTextInput = React.forwardRef(
  (
    {
      label = "Enter text",
      value = "",
      onTextChange,
      backgroundColor = colors.brand_primary_surface_default,
      icon,
      secureTextEntry,
      onIconClick,
      autoCapitalize = "none",
      keyboardType = "default",
      maxLength,
      changeOutlineColor,
      borderColor,
      labelColor,
      textColor,
      showLoader = false,
      editable = true,
      isSvgIcon = false,
      isContact = "",
      multiline = false,
      leftText = "",
      leftPadding,
      error,
      onBlur,
      onFocus,
      disable = false,
      autoFocus = false,
      onSubmitEditing,
      returnKeyType = "done",
      fromReimburesementAccountEdit = false,
      errorColor,
      autoComplete,
      textContentType,
      importantForAutofill,
      autoCorrect
    },
    ref,
  ) => {
    const [selection, setSelection] = React.useState({ start: 0, end: 0 });
    const shouldShowRightIcon = showLoader || icon;
    const isError =
      (error || borderColor === colors.semantic_status_failed_default) &&
      ![colors.semantic_status_settled_default, colors.Pending].includes(
        borderColor,
      );

    // Compute display value: replace every character with '*' if secureTextEntry is active
    const displayValue = secureTextEntry ? "★".repeat(value.length) : value;

    const handleTextChange = (text) => {
      if (secureTextEntry) {
        // Handle backspace/delete when masked
        if (text.length < value.length) {
          const diff = value.length - text.length;
          onTextChange?.(value.slice(0, -diff));
        } else {
          // Append newly typed characters onto original raw value
          const addedChars = text.slice(value.length);
          onTextChange?.(value + addedChars);
        }
      } else {
        onTextChange?.(text);
      }
    };

    return (
      <View>
        <TextInput
          ref={ref}
          label={label ? " " + label : "Enter text"}
          value={secureTextEntry ? value : displayValue}
          onChangeText={handleTextChange}
          mode="outlined"
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          textContentType={textContentType}
          importantForAutofill={importantForAutofill}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          secureTextEntry={false}
          editable={editable}
          multiline={multiline}
          error={isError}
          onBlur={onBlur}
          onFocus={() => {
            onFocus?.();
            setSelection(undefined);
          }}
          autoFocus={autoFocus}
          textColor={textColor || colors.brand_content_text_default}
          outlineColor={borderColor || "white"}
          outlineStyle={{
            borderWidth: borderValue.thin,
            borderRadius: iconSizes.XL,
            opacity: disable ? opacityValue.low : opacityValue.high,
          }}
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.brand_primary_surface_default,
            height: iconSizes.XL,
            opacity: disable ? opacityValue.low : opacityValue.high,
            ...fontStyle("regular", "textMedium"),
          }}
          contentStyle={{
            paddingRight: shouldShowRightIcon
              ? pageSizeValue.default
              : spacing.L,
            paddingLeft:
              leftPadding !== undefined
                ? leftPadding
                : leftText.length > 1
                ? TEXT_INPUT_MULTI_CHAR_PREFIX_BASE +
                  leftText.length * TEXT_INPUT_MULTI_CHAR_PREFIX_PER_CHAR
                : leftText.length === 1
                ? TEXT_INPUT_CURRENCY_PADDING
                : TEXT_INPUT_LEFT_PADDING,
            opacity: disable ? opacityValue.low : opacityValue.high,
          }}
          activeOutlineColor={changeOutlineColor || colors.Pending}
          theme={{
            colors: {
              ...(errorColor ? { error: errorColor } : {}),
              onSurfaceVariant:
                labelColor || borderColor || colors.brand_content_text_default,
            },
          }}
          left={
            leftText ? (
              <TextInput.Affix
                textStyle={{ color: "white", paddingTop: spacing.Xs }}
                text={leftText}
              />
            ) : null
          }
          {...(selection && fromReimburesementAccountEdit && { selection })}
          {...(shouldShowRightIcon &&
            (isContact || isSvgIcon
              ? value.length >= 0
              : value.length > 10) && {
              right: (
                <TextInput.Icon
                  onPress={onIconClick}
                  icon={() =>
                    showLoader ? (
                      <StandardLoader size={LOADER_SIZE.Small} />
                    ) : icon ? (
                      isSvgIcon ? (
                        icon
                      ) : (
                        <IconComponent
                          iconUrl={icon}
                          width={appLockButton}
                          height={appLockButton}
                        />
                      )
                    ) : null
                  }
                />
              ),
            })}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  },
);

export default CommonTextInput;
