import 'package:flutter/material.dart';
import 'package:heart_u/core/utils/size_utils.dart';
import 'package:heart_u/theme/theme_helper.dart';

/// A class that offers pre-defined button styles for customizing button appearance.
class CustomButtonStyles {
  static BoxDecoration get gradientLightGreenToPrimaryDecoration =>
      BoxDecoration(
        borderRadius: BorderRadius.circular(21.h),
        gradient: LinearGradient(
          begin: const Alignment(1.08, 0),
          end: const Alignment(0.0, 0),
          colors: [appTheme.lightGreen600, theme.colorScheme.primary],
        ),
      );
  // Filled button style
  static ButtonStyle get fillPinkA => ElevatedButton.styleFrom(
    backgroundColor: appTheme.pinkA20001,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10.h),
    ),
  );
  static ButtonStyle get fillPrimaryTL10 => ElevatedButton.styleFrom(
    backgroundColor: theme.colorScheme.primary,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10.h),
    ),
  );
// Gradient button style
  static BoxDecoration get gradientIndigoAToPinkADecoration => BoxDecoration(
    borderRadius: BorderRadius.circular(24.h),
    gradient: LinearGradient(
      begin: const Alignment(0.0, 0),
      end: const Alignment(0.0, 1),
      colors: [appTheme.indigoA400, appTheme.pinkA200],
    ),
  );
  static BoxDecoration get gradientOnPrimaryToPinkADecoration => BoxDecoration(
    borderRadius: BorderRadius.circular(28.h),
    gradient: LinearGradient(
      begin: const Alignment(0.0, 0),
      end: const Alignment(0.0, 1),
      colors: [theme.colorScheme.onPrimary, appTheme.pinkA200],
    ),
  );
// text button style
  static ButtonStyle get none => ButtonStyle(
    backgroundColor: MaterialStateProperty.all<Color>(Colors.transparent),
    elevation: MaterialStateProperty.all<double>(0),
  );

  static ButtonStyle get fillLightBlue => ElevatedButton.styleFrom(
    backgroundColor: appTheme.pinkA20001,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8.h),
    ),
  );
// text button style

}

