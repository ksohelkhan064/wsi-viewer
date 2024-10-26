import React, { useState, useEffect } from "react";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import wsi from "../assets/wsi.png";

const WSIViewer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewportPosition, setViewportPosition] = useState({ x: 20, y: 20 });
  const [currentData, setCurrentData] = useState({});

  // Simulated data for different zoom levels
  const zoomLevelData = {
    1: {
      RBC: [
        { name: "Angled Cells", count: 222, percentage: "67%" },
        { name: "Borderline Ovalocytes", count: 50, percentage: "20%" },
        { name: "Burr Cells", count: 87, percentage: "34%" },
      ],
      WBC: [
        { name: "Basophil", count: 222, percentage: "67%" },
        { name: "Eosinophil", count: 50, percentage: "20%" },
      ],
      Platelets: {
        count: 222,
        percentage: "67%",
      },
    },
    1.5: {
      RBC: [
        { name: "Angled Cells", count: 145, percentage: "45%" },
        { name: "Borderline Ovalocytes", count: 78, percentage: "32%" },
        { name: "Burr Cells", count: 56, percentage: "28%" },
        { name: "Fragmented Cells", count: 12, percentage: "5%" },
      ],
      WBC: [
        { name: "Basophil", count: 145, percentage: "45%" },
        { name: "Eosinophil", count: 78, percentage: "32%" },
        { name: "Lymphocyte", count: 56, percentage: "28%" },
      ],
      Platelets: {
        count: 145,
        percentage: "45%",
      },
    },
    2: {
      RBC: [
        { name: "Angled Cells", count: 89, percentage: "35%" },
        { name: "Borderline Ovalocytes", count: 95, percentage: "38%" },
        { name: "Burr Cells", count: 67, percentage: "29%" },
        { name: "Fragmented Cells", count: 23, percentage: "8%" },
        { name: "Ovalocytes", count: 45, percentage: "15%" },
      ],
      WBC: [
        { name: "Basophil", count: 89, percentage: "35%" },
        { name: "Eosinophil", count: 95, percentage: "38%" },
        { name: "Lymphocyte", count: 67, percentage: "29%" },
        { name: "Monocyte", count: 23, percentage: "8%" },
      ],
      Platelets: {
        count: 89,
        percentage: "35%",
      },
    },
    2.5: {
      RBC: [
        { name: "Angled Cells", count: 150, percentage: "55%" },
        { name: "Borderline Ovalocytes", count: 110, percentage: "40%" },
        { name: "Burr Cells", count: 80, percentage: "30%" },
        { name: "Fragmented Cells", count: 35, percentage: "15%" },
        { name: "Ovalocytes", count: 60, percentage: "25%" },
        { name: "Target Cells", count: 10, percentage: "5%" },
      ],
      WBC: [
        { name: "Basophil", count: 120, percentage: "45%" },
        { name: "Eosinophil", count: 110, percentage: "40%" },
        { name: "Lymphocyte", count: 85, percentage: "32%" },
        { name: "Monocyte", count: 30, percentage: "10%" },
        { name: "Neutrophil", count: 50, percentage: "18%" },
      ],
      Platelets: {
        count: 120,
        percentage: "45%",
      },
    },
    3: {
      RBC: [
        { name: "Angled Cells", count: 180, percentage: "60%" },
        { name: "Borderline Ovalocytes", count: 125, percentage: "45%" },
        { name: "Burr Cells", count: 95, percentage: "35%" },
        { name: "Fragmented Cells", count: 45, percentage: "20%" },
        { name: "Ovalocytes", count: 80, percentage: "30%" },
        { name: "Target Cells", count: 30, percentage: "10%" },
        { name: "Elliptocytes", count: 20, percentage: "8%" },
      ],
      WBC: [
        { name: "Basophil", count: 150, percentage: "50%" },
        { name: "Eosinophil", count: 120, percentage: "40%" },
        { name: "Lymphocyte", count: 90, percentage: "30%" },
        { name: "Monocyte", count: 35, percentage: "15%" },
        { name: "Neutrophil", count: 60, percentage: "20%" },
      ],
      Platelets: {
        count: 150,
        percentage: "50%",
      },
    },
  };

  // Update data based on zoom level
  useEffect(() => {
    const nearestZoomLevel = Object.keys(zoomLevelData).reduce((prev, curr) => {
      return Math.abs(curr - zoomLevel) < Math.abs(prev - zoomLevel)
        ? curr
        : prev;
    });
    setCurrentData(zoomLevelData[nearestZoomLevel]);
  }, [zoomLevel]);

  // Handle image dragging for pan
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = (e.clientX - dragStart.x) / (zoomLevel * 100);
    const deltaY = (e.clientY - dragStart.y) / (zoomLevel * 100);

    setViewportPosition((prev) => ({
      x: Math.max(0, Math.min(100 - 30, prev.x - deltaX)),
      y: Math.max(0, Math.min(100 - 30, prev.y - deltaY)),
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    const viewer = document.documentElement; // or you can target a specific ref element like a div

    if (!isFullscreen) {
      if (viewer.requestFullscreen) viewer.requestFullscreen();
      else if (viewer.mozRequestFullScreen)
        viewer.mozRequestFullScreen(); // Firefox
      else if (viewer.webkitRequestFullscreen)
        viewer.webkitRequestFullscreen(); // Chrome, Safari, Opera
      else if (viewer.msRequestFullscreen) viewer.msRequestFullscreen(); // IE/Edge
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }

    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <button className="flex items-center text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <h3 className="font-semibold mb-2 bg-green-100 p-2">RBC</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Type</th>
                  <th className="text-right">Count</th>
                  <th className="text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {currentData.RBC?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-1">{item.name}</td>
                    <td className="text-right">{item.count || "-"}</td>
                    <td className="text-right">{item.percentage || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2 bg-green-100 p-2">WBC</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Type</th>
                  <th className="text-right">Count</th>
                  <th className="text-right">%</th>
                </tr>
              </thead>
              <tbody>
                {currentData.WBC?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-1">{item.name}</td>
                    <td className="text-right">{item.count}</td>
                    <td className="text-right">{item.percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-semibold mb-2 bg-green-100 p-2">Platelets</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td>Count</td>
                  <td className="text-right">{currentData.Platelets?.count}</td>
                </tr>
                <tr>
                  <td>Percentage</td>
                  <td className="text-right">
                    {currentData.Platelets?.percentage}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white p-4 border-b flex justify-between items-center">
          <div className="text-lg font-semibold">
            Patient ID: WSI-2024-001
            <span className="ml-4 text-sm text-gray-500">
              Magnification: {(zoomLevel * 40).toFixed(1)}x
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span>{(zoomLevel * 100).toFixed(0)}%</span>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              //   onClick={() => setIsFullscreen(!isFullscreen)}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Main Viewer */}
        <div className="flex-1 p-4 flex">
          <div className="flex-1 relative">
            <Card className="absolute inset-0">
              <CardContent className="p-0 h-full overflow-hidden">
                <div
                  className="relative w-full h-full"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={wsi}
                    alt="WSI Main View"
                    className="w-full h-full object-cover cursor-move"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: "0 0",
                      transition: "transform 0.2s ease-out",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thumbnail Navigator */}
          <div className="w-64 ml-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Overview</h3>
                <div className="relative">
                  <img
                    src={wsi}
                    alt="WSI Overview"
                    className="w-full rounded"
                  />
                  <div
                    className="absolute border-2 border-blue-500"
                    style={{
                      top: `${viewportPosition.y}%`,
                      left: `${viewportPosition.x}%`,
                      width: `${30 / zoomLevel}%`,
                      height: `${30 / zoomLevel}%`,
                      transition: "width 0.2s, height 0.2s",
                    }}
                  />
                </div>
              </CardContent>
              <div className="mb-4">
                <p className="text-gray-600">
                  Patient ID: <span className="font-bold">WSI-2024-001</span>
                </p>
                <p className="text-gray-600">
                  Blood Group: <span className="font-bold">O+</span>
                </p>
              </div>

              <button
                className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
                onClick={() => setZoomLevel(1)} // Reset to default zoom level
              >
                Reset Zoom
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WSIViewer;
