import 'package:flutter/material.dart';
import '../core/app_export.dart';

class AppDecoration {
  // F decorations
  static BoxDecoration get ffffff => BoxDecoration(
    color: appTheme.whiteA700,
  );
// Fill decorations
  static BoxDecoration get fillGray => BoxDecoration(
    color: appTheme.gray100,
  );
  static BoxDecoration get fillOnPrimaryContainer => BoxDecoration(
    color: theme.colorScheme.onPrimaryContainer,
  );
  static BoxDecoration get fillPrimary => BoxDecoration(
    color: theme.colorScheme.primary,
  );
// Gradient decorations
  static BoxDecoration get gradientOnPrimaryToPinkA => BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment(0, 0),
      end: Alignment(0, 1),
      colors: [theme.colorScheme.onPrimary, appTheme.pinkA200],
    ),
  );
  static BoxDecoration get gradientWhiteAToBlue => BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment(0, 0),
      end: Alignment(0, 1),
      colors: [appTheme.whiteA700, appTheme.blue50],
    ),
  );
// Outline decorations
  static BoxDecoration get outlineIndigo => BoxDecoration(
    color: appTheme.whiteA700,
    boxShadow: [
      BoxShadow(
        color: appTheme.indigo90028,
        spreadRadius: 2.h,
        blurRadius: 2.h,
        offset: const Offset(
          0,
          34,
        ),
      )
    ],
  );
  static BoxDecoration get outlineIndigoB => BoxDecoration(
    color: appTheme.whiteA700,
    boxShadow: [
      BoxShadow(
        color: appTheme.indigo9000b,
        spreadRadius: 2.h,
        blurRadius: 2.h,
        offset: const Offset(
          0,
          25,
        ),
      )
    ],
  );
}

class BorderRadiusStyle {
  // Rounded borders
  static BorderRadius get roundedBorder12 => BorderRadius.circular(
    12.h,
  );
  static BorderRadius get roundedBorder10 => BorderRadius.circular(
    10.h,
  );
  static BorderRadius get roundedBorder118 => BorderRadius.circular(
    118.h,
  );
  static BorderRadius get roundedBorder126 => BorderRadius.circular(
    126.h,
  );
  static BorderRadius get roundedBorder20 => BorderRadius.circular(
    20.h,
  );
  static BorderRadius get circleBorder16 => BorderRadius.circular(
    16.h,
  );

  static BorderRadius get customBorderBL24 => BorderRadius.only(
    topLeft: Radius.circular(4.h),
    topRight: Radius.circular(24.h),
    bottomLeft: Radius.circular(24.h),
    bottomRight: Radius.circular(24.h),
  );
}
