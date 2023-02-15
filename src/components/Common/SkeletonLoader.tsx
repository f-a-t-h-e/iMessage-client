import { Skeleton } from "@chakra-ui/react";

interface ISkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
}

const SkeletonLoader = ({
  count = 1,
  height = "100%",
  width = "100%",
}: ISkeletonLoaderProps) => {
  console.log("counts", count);
  return (
    <>
      {/* <Skeleton
        w={"100%"}
        h={height}
        startColor="blackAlpha.400"
        endColor="whiteAlpha.300"
      /> */}
      {Array(count)
        .fill("")
        .map((_, i) => (
          <Skeleton
            key={i}
            startColor="blackAlpha.400"
            endColor="whiteAlpha.300"
            height={height}
            width={width}
            borderRadius={4}
          />
        ))}
    </>
  );
};

export default SkeletonLoader;
