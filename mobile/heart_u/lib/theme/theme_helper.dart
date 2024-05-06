import 'package:flutter/material.dart';
import '../core/app_export.dart';

String _appTheme = "lightCode";
LightCodeColors get appTheme => ThemeHelper().themeColor();
ThemeData get theme => ThemeHelper().themeData();

/// Helper class for managing themes and colors.
class ThemeHelper {
  // A map of custom color themes supported by the app
  final Map<String, LightCodeColors> _supportedCustomColor = {
    'lightCode': LightCodeColors()
  };

// A map of color schemes supported by the app
  final Map<String, ColorScheme> _supportedColorScheme = {
    'lightCode': ColorSchemes.lightCodeColorScheme
  };

  /// Changes the app theme to [newTheme].
  void changeTheme(String newTheme) {
    _appTheme = newTheme;
  }

  /// Returns the lightCode colors for the current theme.
  LightCodeColors _getThemeColors() {
    return _supportedCustomColor[_appTheme] ?? LightCodeColors();
  }

  /// Returns the current theme data.
  ThemeData _getThemeData() {
    var colorScheme =
        _supportedColorScheme[_appTheme] ?? ColorSchemes.lightCodeColorScheme;
    return ThemeData(
      visualDensity: VisualDensity.standard,
      colorScheme: colorScheme,
      textTheme: TextThemes.textTheme(colorScheme),
      scaffoldBackgroundColor: appTheme.whiteA700,
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: colorScheme.primary,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
          ),
          visualDensity: const VisualDensity(
            vertical: -4,
            horizontal: -4,
          ),
          padding: EdgeInsets.zero,
        ),
      ),
    );
  }

  /// Returns the lightCode colors for the current theme.
  LightCodeColors themeColor() => _getThemeColors();

  /// Returns the current theme data.
  ThemeData themeData() => _getThemeData();
}

/// Class containing the supported text theme styles.
class TextThemes {
  static TextTheme textTheme(ColorScheme colorScheme) => TextTheme(
    bodyLarge: TextStyle(
      color: appTheme.blueGray400,
      fontSize: 16.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w400,
    ),
    displayMedium: TextStyle(
      color: colorScheme.primary,
      fontSize: 40.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w800,
    ),
    headlineLarge: TextStyle(
      color: colorScheme.primary,
      fontSize: 32.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w800,
    ),
    headlineMedium: TextStyle(
      color: colorScheme.primary,
      fontSize: 28.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w800,
    ),
    headlineSmall: TextStyle(
      color: appTheme.whiteA700,
      fontSize: 24.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w800,
    ),
    titleLarge: TextStyle(
      color: colorScheme.primary,
      fontSize: 20.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w800,
    ),
    titleMedium: TextStyle(
      color: appTheme.whiteA700,
      fontSize: 16.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w700,
    ),
    titleSmall: TextStyle(
      color: appTheme.blueGray400,
      fontSize: 14.fSize,
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: FontWeight.w700,
    ),
  );
}

/// Class containing the supported color schemes.
class ColorSchemes {
  static const lightCodeColorScheme = ColorScheme.light(
    primary: Color(0XFF13173F),
    primaryContainer: Color(0XFF000000),
    secondaryContainer: Color(0XFF13183F),
    onErrorContainer: Color(0XFFB8BCCA),
    onPrimary: Color(0XFFFF6F47),
    onPrimaryContainer: Color(0XFF1C1B1F),
  );
}

/// Class containing custom colors for a lightCode theme.
class LightCodeColors {
  //Black
  Color get black900 => const Color(0XFF000000);
  // Blue
  Color get blue50 => const Color(0XFFEFF1FF);
// BlueGray
  Color get blueGray400 => const Color(0XFF82859A);
  Color get blueGray40001 => const Color(0XFF888888);
// Gray
  Color get gray100 => const Color(0XFFF3F4FF);
  Color get gray50 => const Color(0XFFF8FAFC);
// Indigob
  Color get indigo9000b => const Color(0X0B06168D);
// Indigo
  Color get indigo90028 => const Color(0X2806158D);
  Color get indigoA400 => const Color(0XFF4750FF);
// Pink
  Color get pinkA200 => const Color(0XFFF02AA6);
  Color get pinkA20001 => const Color(0XFFF74780);
// White
  Color get whiteA700 => const Color(0XFFFFFFFF);
  Color get lightGreen600 => const Color(0XFF81B83A);
  Color get lightGreenA700E5 => const Color(0XE586CE1B);

}
