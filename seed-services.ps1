$ErrorActionPreference = 'SilentlyContinue'

Start-Sleep -Seconds 3

$services = @(
  @{name="Cremation Services"; heading="Cremation Services"; caption="Professional cremation services with dignified handling and care"; content=""; image="https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4"; order=1},
  @{name="Mausoleums"; heading="Mausoleums"; caption="Beautiful above-ground mausoleum options for eternal resting places"; content=""; image="https://res.cloudinary.com/samson-group/video/upload/v1640231567/servicesvid/mausoleum_iby7ho_rx4veh.mp4"; order=2},
  @{name="Memorial Services"; heading="Memorial Services"; caption="Meaningful memorial services to honor and celebrate lives"; content=""; image="https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/interment_jpdhwx_fwcnuh.mp4"; order=3},
  @{name="Caskets"; heading="Caskets"; caption="Premium selection of caskets in various styles and materials"; content=""; image="https://res.cloudinary.com/samson-group/video/upload/v1640231570/servicesvid/casket_oibqpx_bwxxmo.mp4"; order=4},
  @{name="Columbary Inurnment"; heading="Columbary Inurnment"; caption="Elegant columbarium units for cremated remains"; content=""; image="https://res.cloudinary.com/samson-group/video/upload/v1640231557/servicesvid/urnburial_spstcl_otvukx.mp4"; order=5},
  @{name="Funeral Ceremony"; heading="Funeral Ceremony"; caption="Complete funeral ceremony arrangements and coordination"; content=""; image="https://res.cloudinary.com/samson-group/video/upload/v1640231559/servicesvid/urnfuneralwake_dwsf22_hnyjkl.mp4"; order=6}
)

Write-Host "Adding services..." -ForegroundColor Cyan
foreach ($s in $services) { 
  $json = $s | ConvertTo-Json
  Start-Sleep -Milliseconds 300
  try {
    Invoke-WebRequest -Uri "http://localhost:3001/api/services" -Method POST -ContentType "application/json" -Body $json -TimeoutSec 5 -ErrorAction Stop | Out-Null
    Write-Host ("Added: " + $s.heading) -ForegroundColor Green
  } catch {
    Write-Host ("Failed: " + $s.heading) -ForegroundColor Red
  }
}
Write-Host "Complete!" -ForegroundColor Green
