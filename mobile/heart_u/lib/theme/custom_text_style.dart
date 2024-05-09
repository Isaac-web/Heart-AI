
import 'package:flutter/material.dart';
import '../core/app_export.dart';

extension on TextStyle {
  TextStyle get plusJakartaSans {
    return copyWith(
      fontFamily: 'Plus Jakarta Sans',
    );
  }

  TextStyle get iBMPlexSans {
    return copyWith(
      fontFamily: 'IBM Plex Sans',
    );
  }
}

/// A collection of pre-defined text styles for customizing text appearance,
/// categorized by different font families and weights.
/// Additionally, this class includes extensions on [TextStyle] to easily apply specific font families to text.
class CustomTextStyles {
  // Body text style
  static get bodyLargeBlack900 => theme.textTheme.bodyLarge!.copyWith(
    color: appTheme.black900,
  );
  static get bodyLargeIBMPlexSansOnErrorContainer =>
      theme.textTheme.bodyLarge!.iBMPlexSans.copyWith(
        color: theme.colorScheme.onErrorContainer,
      );
  static get bodyLargeSecondaryContainer => theme.textTheme.bodyLarge!.copyWith(
    color: theme.colorScheme.secondaryContainer,
  );

  static get labelLargeOnPrimary => theme.textTheme.labelLarge!.copyWith(
    color: theme.colorScheme.onPrimary,
  );

  static get bodyLargeOnPrimary => theme.textTheme.bodyLarge!.copyWith(
    color: theme.colorScheme.onPrimary,
  );
// Headline text style
  static get headlineMediumPinkA20001 =>
      theme.textTheme.headlineMedium!.copyWith(
        color: appTheme.pinkA20001,
        fontWeight: FontWeight.w700,
      );
  static get headlineMediumWhiteA700 =>
      theme.textTheme.headlineMedium!.copyWith(
        color: appTheme.whiteA700,
      );
// Title text style
  static get titleLargePrimaryContainer => theme.textTheme.titleLarge!.copyWith(
    color: theme.colorScheme.primaryContainer,
    fontWeight: FontWeight.w400,
  );
  static get titleLargeSecondaryContainer =>
      theme.textTheme.titleLarge!.copyWith(
        color: theme.colorScheme.secondaryContainer,
        fontWeight: FontWeight.w600,
      );
  static get titleMediumBluegray400 => theme.textTheme.titleMedium!.copyWith(
    color: appTheme.blueGray400,
    fontWeight: FontWeight.w500,
  );
  static get titleMediumPinkA20001 => theme.textTheme.titleMedium!.copyWith(
    color: appTheme.pinkA20001,
    fontSize: 18.fSize,
  );
}
