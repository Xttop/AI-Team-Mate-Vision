package com.xttopbio.altima.metavr

import android.content.pm.PackageManager
import android.os.Bundle
import androidx.compose.ui.platform.ComposeView
import androidx.core.app.ActivityCompat
import com.meta.spatial.compose.ComposeFeature
import com.meta.spatial.compose.ComposeViewPanelRegistration
import com.meta.spatial.core.Entity
import com.meta.spatial.core.Pose
import com.meta.spatial.core.SpatialFeature
import com.meta.spatial.core.Vector3
import com.meta.spatial.isdk.GazeHoverEffectSystem
import com.meta.spatial.isdk.IsdkSystem
import com.meta.spatial.runtime.ReferenceSpace
import com.meta.spatial.toolkit.AppSystemActivity
import com.meta.spatial.toolkit.DpPerMeterDisplayOptions
import com.meta.spatial.toolkit.Panel
import com.meta.spatial.toolkit.PanelRegistration
import com.meta.spatial.toolkit.PanelStyleOptions
import com.meta.spatial.toolkit.QuadShapeOptions
import com.meta.spatial.toolkit.Transform
import com.meta.spatial.toolkit.UIPanelSettings
import com.meta.spatial.uiunderstanding.UiUnderstandingFeature
import com.meta.spatial.vr.VRFeature

class AltimaVrGlassesActivity : AppSystemActivity() {

  override fun registerFeatures(): List<SpatialFeature> {
    return listOf(
      VRFeature(this),
      ComposeFeature(),
      UiUnderstandingFeature(this),
    )
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    requestEyeTrackingPermission()
  }

  override fun onSceneReady() {
    super.onSceneReady()

    scene.setReferenceSpace(ReferenceSpace.LOCAL_FLOOR)
    scene.enablePassthrough(true)
    scene.setViewOrigin(0f, 0f, 0f, 0f)

    val isdkSystem = systemManager.findSystem<IsdkSystem>()
    isdkSystem.gazeEnabled = true
    isdkSystem.hmdGazeFallbackEnabled = true
    isdkSystem.setScenePointerDistance(8.0f)

    systemManager.findSystem<GazeHoverEffectSystem>().enable()

    Entity.create(
      listOf(
        Panel(R.id.main_panel),
        Transform(Pose(Vector3(x = 0f, y = 1.35f, z = 1.45f))),
      ),
    )
  }

  override fun registerPanels(): List<PanelRegistration> {
    return listOf(
      ComposeViewPanelRegistration(
        R.id.main_panel,
        composeViewCreator = { _, context ->
          ComposeView(context).apply {
            setContent { AltimaGlassesHud() }
          }
        },
        settingsCreator = {
          UIPanelSettings(
            shape = QuadShapeOptions(width = 1.15f, height = 0.72f),
            style = PanelStyleOptions(themeResourceId = R.style.PanelAppThemeTransparent),
            display = DpPerMeterDisplayOptions(),
          )
        },
      ),
    )
  }

  private fun requestEyeTrackingPermission() {
    val permission = "horizonos.permission.EYE_TRACKING"
    if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
      ActivityCompat.requestPermissions(this, arrayOf(permission), 1001)
    }
  }
}
