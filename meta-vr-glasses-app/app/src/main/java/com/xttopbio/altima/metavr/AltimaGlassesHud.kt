package com.xttopbio.altima.metavr

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

private val Bg = Color(0xE6060B1C)
private val Panel = Color(0xE6101835)
private val Cyan = Color(0xFF22D3EE)
private val Blue = Color(0xFF5A78FF)
private val Purple = Color(0xFFA855F7)
private val TextMain = Color(0xFFF7FBFF)
private val TextMuted = Color(0xFFA8B3D3)
private val Good = Color(0xFF58F2C4)

@Composable
fun AltimaGlassesHud() {
  var reps by remember { mutableIntStateOf(8) }
  var running by remember { mutableStateOf(true) }
  var exercise by remember { mutableStateOf("BARBELL SQUAT") }

  Box(
    modifier = Modifier
      .fillMaxSize()
      .clip(RoundedCornerShape(34.dp))
      .background(
        Brush.linearGradient(
          listOf(Bg, Color(0xEC0A1530), Color(0xED120D2E))
        )
      )
      .padding(28.dp)
  ) {
    Column(modifier = Modifier.fillMaxSize()) {
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Column {
          Text(
            "ALTIMA ML VISION",
            color = Cyan,
            fontSize = 15.sp,
            fontWeight = FontWeight.Black,
            letterSpacing = 1.4.sp
          )
          Text(
            "AI Sports Assistant • Meta VR Glasses",
            color = TextMuted,
            fontSize = 12.sp
          )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
          MetricChip("128", "BPM")
          MetricChip("92%", "FORM")
        }
      }

      Spacer(Modifier.height(24.dp))

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(18.dp)
      ) {
        Column(
          modifier = Modifier.weight(1f)
        ) {
          Text(
            "LIVE AI COACH",
            color = Cyan,
            fontSize = 12.sp,
            fontWeight = FontWeight.Black
          )
          Text(
            exercise,
            color = TextMain,
            fontSize = 30.sp,
            fontWeight = FontWeight.Black
          )
          Spacer(Modifier.height(8.dp))
          Text(
            "Keep your knees aligned with your toes and maintain a neutral back.",
            color = TextMuted,
            fontSize = 15.sp,
            lineHeight = 20.sp
          )

          Spacer(Modifier.height(18.dp))

          Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            StatusLine("✓", "Back posture", "Good", Good)
            StatusLine("!", "Knee line", "Correct", Cyan)
          }
        }

        Box(
          modifier = Modifier
            .size(176.dp)
            .clip(CircleShape)
            .background(
              Brush.radialGradient(
                listOf(Color(0x5522D3EE), Color(0x224F6FFF), Color.Transparent)
              )
            ),
          contentAlignment = Alignment.Center
        ) {
          Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
              reps.toString(),
              color = TextMain,
              fontSize = 58.sp,
              fontWeight = FontWeight.Black
            )
            Text(
              "/ 12 REPS",
              color = TextMuted,
              fontSize = 12.sp,
              fontWeight = FontWeight.Bold
            )
          }
        }
      }

      Spacer(Modifier.weight(1f))

      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(12.dp),
      ) {
        GazeButton(
          label = if (running) "Pause session" else "Resume session",
          modifier = Modifier.weight(1f),
          onClick = { running = !running },
        )

        GazeButton(
          label = if (reps >= 12) "Set complete" else "+ Count rep",
          modifier = Modifier.weight(1f),
          onClick = { reps = (reps + 1).coerceAtMost(12) },
        )

        GazeButton(
          label = "Next exercise",
          modifier = Modifier.weight(1f),
          onClick = {
            exercise = if (exercise == "BARBELL SQUAT") "SHOULDER PRESS" else "BARBELL SQUAT"
            reps = 0
          },
        )
      }

      Spacer(Modifier.height(12.dp))
      Text(
        "Look at a control and pinch to select. Eye-gaze falls back to head direction on test devices without eye tracking.",
        color = TextMuted,
        fontSize = 11.sp
      )
    }
  }
}

@Composable
private fun MetricChip(value: String, label: String) {
  Column(
    modifier = Modifier
      .clip(RoundedCornerShape(18.dp))
      .background(Panel)
      .padding(horizontal = 16.dp, vertical = 10.dp),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Text(value, color = TextMain, fontSize = 18.sp, fontWeight = FontWeight.Black)
    Text(label, color = TextMuted, fontSize = 9.sp, fontWeight = FontWeight.Bold)
  }
}

@Composable
private fun StatusLine(icon: String, title: String, value: String, accent: Color) {
  Row(
    modifier = Modifier
      .clip(RoundedCornerShape(16.dp))
      .background(Panel)
      .padding(horizontal = 12.dp, vertical = 10.dp),
    verticalAlignment = Alignment.CenterVertically
  ) {
    Text(icon, color = accent, fontSize = 16.sp, fontWeight = FontWeight.Black)
    Spacer(Modifier.size(8.dp))
    Column {
      Text(title, color = TextMuted, fontSize = 9.sp)
      Text(value, color = TextMain, fontSize = 12.sp, fontWeight = FontWeight.Bold)
    }
  }
}

@Composable
private fun GazeButton(
  label: String,
  modifier: Modifier = Modifier,
  onClick: () -> Unit,
) {
  Box(
    modifier = modifier
      .height(54.dp)
      .clip(RoundedCornerShape(18.dp))
      .background(
        Brush.horizontalGradient(listOf(Cyan, Blue, Purple))
      )
      .clickable(onClick = onClick),
    contentAlignment = Alignment.Center
  ) {
    Text(
      label,
      color = Color.White,
      fontWeight = FontWeight.Black,
      fontSize = 13.sp
    )
  }
}
