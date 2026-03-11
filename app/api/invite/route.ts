import { NextRequest, NextResponse } from "next/server"

/**
 * 邀请码验证 API
 *
 * MVP 阶段采用简单的白名单验证
 * 后续可扩展为 EIP-712 链下签名验证
 *
 * @description Verifies an invitation code
 * @method POST
 * @body { string } code - The invitation code to verify
 * @returns { success: boolean, message?: string, isValid?: boolean }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json(
        { success: false, message: "邀请码不能为空" },
        { status: 400 }
      )
    }

    // normalize to uppercase
    const normalizedCode = code.trim().toUpperCase()

    // MVP: Simple whitelist check
    // TODO: Implement EIP-712 signature verification for production
    const validCodes = [
      "EXPO2025",
      "EARLYBIRD",
      "VIP001",
      "LAUNCH",
      "FOUNDER",
      "BETA2026",
    ]

    const isValid = validCodes.includes(normalizedCode)

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "无效的邀请码",
          isValid: false
        },
        { status: 403 }
      )
    }

    // In production, you could:
    // 1. Check if the code has been used too many times
    // 2. Verify EIP-712 signature
    // 3. Log the verification attempt
    // 4. Return additional metadata about the invitation tier

    return NextResponse.json({
      success: true,
      isValid: true,
      message: "验证通过",
      code: normalizedCode,
      // Optional metadata for future use
      metadata: {
        tier: validCodes.indexOf(normalizedCode) < 2 ? "founder" : "standard",
        // EIP-712: Could add signature verification result here
      }
    })

  } catch (error) {
    console.error("Invite code verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "验证失败，请稍后重试"
      },
      { status: 500 }
    )
  }
}

/**
 * GET handler for checking invitation code status
 * Could be used for checking if a code exists without full verification flow
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json(
      { success: false, message: "请提供邀请码" },
      { status: 400 }
    )
  }

  const normalizedCode = code.trim().toUpperCase()
  const validCodes = [
    "EXPO2025",
    "EARLYBIRD",
    "VIP001",
    "LAUNCH",
    "FOUNDER",
    "BETA2026",
  ]

  const exists = validCodes.includes(normalizedCode)

  return NextResponse.json({
    success: true,
    exists,
    code: normalizedCode
  })
}
